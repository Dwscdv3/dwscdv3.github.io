function DwComment(host, node) {
    const self = this;

    var $nickname, $mail, $link, $content, $remember, $cancelReply, $submit;
    var forwardTo = 0;

    self.host = host;
    self.node = node;
    self.threadId = undefined;

    var md = window.markdownit ? window.markdownit({
        html: false,
        xhtmlOut: false,
        breaks: true,
        linkify: true,
        typographer: false,
        highlight: function (str, lang) {
            if (lang && window.hljs && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (__) {}
            }
            return '';
        }
    }) : null;

    if (md) {
        console.log("DwComment: markdown-it detected, comments will be parsed.");
    }

    self.load = function (callback) {
        if (!self.threadId) {
            renderUnavailable();
        } else {
            self.threadId = parseInt(self.threadId);
            if (!isNaN(self.threadId)) {
                ajaxGet(host + "/Threads/" + self.threadId, function () {
                    if (this.readyState == XMLHttpRequest.DONE) {
                        if (this.status >= 200 &&
                            this.status < 300) {
                            console.log("Thread " + self.threadId);
                            var comments = JSON.parse(this.responseText);
                            renderDwComment.bind(self)(comments);
                            if (typeof callback === "function") {
                                callback({ success: true });
                            }
                        } else {
                            if (typeof callback === "function") {
                                callback({ success: false });
                            }
                        }
                    }
                });
            }
        }
    };

    self.post = function (nickname, content, mail, link, forwardTo) {
        if (!mail || !mail.trim()) {
            mail = undefined;
        }
        if (!link || !link.trim() || link.trim() === "https://") {
            link = undefined;
        }
        forwardTo = parseInt(forwardTo);
        if (!forwardTo) {
            forwardTo = undefined;
        }
        var req = new XMLHttpRequest();
        req.open("POST", host + "/Threads/" + self.threadId);
        req.setRequestHeader("Content-type", "application/json");
        req.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    // TODO: 发布成功提醒
                    self.clear();
                    self.load();
                } else {
                    alert("发布失败！\nHTTP 状态码：" + this.status);
                }
            }
        };
        req.send(JSON.stringify({
            nickname: nickname,
            content: content,
            mail: mail,
            link: link,
            forwardTo: forwardTo
        }));
        if ($remember.checked) {
            localStorage.setItem("DwComment::nickname", nickname);
            localStorage.setItem("DwComment::mail", mail || "");
            localStorage.setItem("DwComment::link", link || "");
            localStorage.setItem("DwComment::remember", true);
        } else {
            localStorage.removeItem("DwComment::nickname");
            localStorage.removeItem("DwComment::mail");
            localStorage.removeItem("DwComment::link");
            localStorage.removeItem("DwComment::remember");
        }
    };

    self.clear = function () {
        if ($remember && !$remember.checked) {
            if ($nickname) $nickname.value = "";
            if ($mail) $mail.value = "";
            if ($link) $link.value = "";
        }
        if ($content) $content.value = "";
        forwardTo = 0;
        $submit.textContent = "发布";
        $cancelReply.style.display = "none";
    }

    function renderDwComment(comments) {
        self.node.innerHTML = "";
        self.node.appendChild(createElement("form", {
            className: "dwcomment-form",
            onsubmit: function () {
                self.post(
                    $nickname.value,
                    $content.value,
                    $mail.value,
                    $link.value,
                    forwardTo
                );
                return false;
            },
            children: [
                $nickname = createElement("input", {
                    type: "text",
                    className: "dwcomment-nickname",
                    placeholder: "昵称",
                    required: "required",
                    value: localStorage.getItem("DwComment::nickname"),
                }),
                $mail = createElement("input", {
                    type: "text",
                    className: "dwcomment-mail",
                    placeholder: "邮箱（可选，用于接收通知）",
                    value: localStorage.getItem("DwComment::mail"),
                }),
                $link = createElement("input", {
                    type: "text",
                    className: "dwcomment-link",
                    placeholder: "链接（可选)",
                    value: localStorage.getItem("DwComment::link"),
                    onfocus: function () {
                        if (!this.value) {
                            this.value = "https://";
                        }
                    },
                }),
                $content = createElement("textarea", {
                    className: "dwcomment-content",
                    placeholder: "说点什么…",
                    rows: 3,
                    required: "required",
                }),
                createElement("div", {
                    className: "dwcomment-markdownit-status",
                    innerHTML:
                        (
                            md
                            ? '✔ 已加载 markdown-it'
                            : '✖ 未找到 <a href="//github.com/markdown-it/markdown-it" target="_blank">markdown-it</a>'
                        )
                        + '，<a href="markdown-cheatsheet" target="_blank">格式帮助</a>',
                }),
                createElement("label", {
                    className: "dwcomment-keep-field-label",
                    children: [
                        $remember = createElement("input", {
                            type: "checkbox",
                            className: "dwcomment-keep-field",
                            checked: localStorage.getItem("DwComment::remember"),
                        }),
                        "记住我",
                    ],
                }),
                $cancelReply = createElement("button", {
                    type: "button",
                    className: "dwcomment-cancel-reply",
                    textContent: "取消回复",
                    styles: {
                        display: "none",
                    },
                    onclick: function () {
                        forwardTo = 0;
                        $submit.textContent = "发布";
                        this.style.display = "none";
                    },
                }),
                $submit = createElement("button", {
                    type: "submit",
                    className: "dwcomment-publish",
                    textContent: "发布",
                }),
            ],
        }));
        self.node.appendChild(createElement("hr"));

        var commentList = createElement("div", {
            className: "dwcomment-list"
        });
        var commentElements = [];
        comments.forEach(function (comment) {
            var commentElement = commentElements[comment.id] = renderComment(comment);
            if (comment.forwardTo && commentElements[comment.forwardTo]) {
                commentElements[comment.forwardTo].$replies.appendChild(commentElement);
            } else {
                commentList.insertBefore(commentElement, commentList.firstChild);
            }
        });
        self.node.appendChild(commentList);

        self.node.appendChild(createElement("div", {
            className: "dwcomment-info",
            textContent: comments.length + " 条评论"
        }));
    }

    function renderComment(comment) {
        var $replies;
        return createElement("div", {
            DwComment_id: comment.id,
            DwComment_nickname: comment.nickname,
            id: "comment-" + comment.id,
            className: "dwcomment-comment",
            children: [
                createElement(comment.link ? "a" : "span", {
                    className: "dwcomment-nickname",
                    href: comment.link,
                    textContent: comment.nickname,
                }),
                createElement("span", {
                    className: "dwcomment-time",
                    textContent: new Date(comment.time).toLocaleString("zh-CN", {
                        hour12: false,
                    }),
                }),
                createElement("span", {
                    className: "dwcomment-reply-button material-icons text-button",
                    textContent: "reply",
                    onclick: function () {
                        $submit.textContent = "回复 " + this.parentNode.DwComment_nickname;
                        $cancelReply.style.display = "";
                        forwardTo = this.parentNode.DwComment_id;
                        $nickname.focus();
                        $content.focus();
                    },
                }),
                createElement("div", {
                    className: "dwcomment-content",
                    innerHTML: md ? md.render(comment.content) : comment.content,
                }),
                $replies = createElement("div", {
                    className: "dwcomment-replies",
                }),
            ],
            $replies: $replies,
        });
    }

    function renderUnavailable() {
        self.node.innerHTML = "";
        self.node.appendChild(createElement("div", {
            className: "dwcomment-info",
            textContent: "评论在此页不可用"
        }));
    }

    function createElement(type, args) {
        var element = document.createElement(type);
        for (var prop in args) {
            var arg = args[prop];
            if (prop === "classList" && arg instanceof Array) {
                arg.forEach(function (cls) {
                    if (typeof cls === "string") {
                        element.classList.add(cls);
                    }
                });
            } else if (prop === "children" && arg instanceof Array) {
                arg.forEach(function (child) {
                    if (child instanceof Node) {
                        element.appendChild(child);
                    } else if (typeof child === "string") {
                        element.appendChild(document.createTextNode(child));
                    }
                });
            } else if (prop === "styles" && arg instanceof Object) {
                for (var name in arg) {
                    element.style[name] = arg[name];
                }
            } else if (prop.startsWith("attr_")) {
                element.setAttribute(prop.substring(5), arg);
            } else if (prop.startsWith("on")) {
                element.addEventListener(prop.substring(2), arg);
            } else {
                element[prop] = arg;
            }
        }
        return element;
    }

    function ajaxGet(url, callback) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = callback;
        req.open("GET", url);
        req.send();
    }
}