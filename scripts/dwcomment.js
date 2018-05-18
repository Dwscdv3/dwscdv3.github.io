function DwComment(host, node) {
    const self = this;

    const formNickname = "dwcomment-nickname";
    const formMail = "dwcomment-mail";
    const formLink = "dwcomment-link";
    const formContent = "dwcomment-content";

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

    self.load = function () {
        if (!self.threadId) {
            console.log("Thread " + self.threadId);
            renderUnavailable();
        } else {
            self.threadId = parseInt(self.threadId);
            if (!isNaN(self.threadId)) {
                ajaxGet(host + "/Threads/" + self.threadId, function () {
                    if (this.readyState == XMLHttpRequest.DONE &&
                        this.status >= 200 &&
                        this.status < 300) {
                        console.log("Thread " + self.threadId);
                        var comments = JSON.parse(this.responseText);
                        renderDwComment.bind(self)(comments);
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
                // TODO: 发送成功与失败提醒
                if (this.status == 200) {
                    self.node.querySelector("." + formNickname).value = "";
                    self.node.querySelector("." + formContent).value = "";
                    self.node.querySelector("." + formMail).value = "";
                    self.node.querySelector("." + formLink).value = "";
                    // TODO: 刷新评论区
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
    };

    function renderDwComment(comments) {
        self.node.innerHTML = "";
        self.node.appendChild(createElement("form", {
            className: "dwcomment-form",
            onsubmit: function () {
                self.post(
                    self.node.querySelector("." + formNickname).value,
                    self.node.querySelector("." + formContent).value,
                    self.node.querySelector("." + formMail).value,
                    self.node.querySelector("." + formLink).value
                );
                return false;
            },
            children: [
                createElement("input", {
                    type: "text",
                    className: formNickname,
                    placeholder: "昵称",
                    required: "required"
                }),
                createElement("input", {
                    type: "text",
                    className: formMail,
                    placeholder: "邮箱（可选，用于接收通知）"
                }),
                createElement("input", {
                    type: "text",
                    className: formLink,
                    placeholder: "链接（可选)",
                    onfocus: function () {
                        if (!this.value) {
                            this.value = "https://";
                        }
                    }
                }),
                createElement("textarea", {
                    className: formContent,
                    placeholder: "说点什么…",
                    rows: 3,
                    required: "required"
                }),
                createElement("div", {
                    className: "dwcomment-markdownit-status",
                    innerHTML: md ?
                        '✔ 已加载 markdown-it' : '✖ 未找到 <a href="//github.com/markdown-it/markdown-it" target="_blank">markdown-it</a>'
                }),
                createElement("label", {
                    className: "dwcomment-keep-field-label",
                    children: [
                        createElement("input", {
                            type: "checkbox",
                            className: "dwcomment-keep-field"
                        }),
                        "记住我（尚未实现）"
                    ]
                }),
                createElement("button", {
                    type: "submit",
                    className: "dwcomment-publish",
                    textContent: "发布"
                })
            ]
        }));
        self.node.appendChild(createElement("hr"));
        var commentList = createElement("div", {
            className: "dwcomment-list"
        });
        // TODO: 倒序输出
        comments.forEach(function (comment) {
            commentList.appendChild(renderComment(comment));
        });
        self.node.appendChild(commentList);
        self.node.appendChild(createElement("div", {
            className: "dwcomment-info",
            textContent: comments.length + " 条评论"
        }));
    }

    function renderComment(comment) {
        return createElement("div", {
            id: "comment-" + comment.id,
            className: "dwcomment-comment",
            children: [
                createElement(comment.link ? "a" : "span", {
                    className: "dwcomment-nickname",
                    href: comment.link,
                    textContent: comment.nickname
                }),
                createElement("span", {
                    className: "dwcomment-time",
                    textContent: new Date(comment.time).toLocaleString("zh-CN", {
                        hour12: false
                    })
                }),
                createElement("div", {
                    className: "dwcomment-content",
                    innerHTML: md ? md.render(comment.content) : comment.content
                })
                // TODO: 回复与楼中楼
            ]
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
                    if (child instanceof Element) {
                        element.appendChild(child);
                    } else if (typeof child === "string") {
                        element.appendChild(document.createTextNode(child));
                    }
                });
            } else if (prop === "styles" && arg instanceof Object) {
                for (var name in styles) {
                    element.style[name] = styles[name];
                }
            } else {
                element[prop] = arg;
            }
        }
        return element;
    }
}