function DwComment(host, node) {
    const formNickname = "dwcomment-nickname";
    const formMail = "dwcomment-mail";
    const formLink = "dwcomment-link";
    const formContent = "dwcomment-content";

    this.host = host;
    this.node = node;
    this.threadId = undefined;

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
        console.log("DwComment: markdown-it detected, comments will be parsed.")
    }

    this.load = function () {
        var self = this;
        if (!this.threadId) {
            console.log("Thread " + this.threadId);
            renderUnavailable.bind(self)();
        } else {
            this.threadId = parseInt(this.threadId);
            if (this.threadId != NaN) {
                ajaxGet(host + "/Threads/" + this.threadId, function () {
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
    }

    this.post = function (nickname, content, mail, link, forwardTo) {
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
        req.open("POST", host + "/Threads/" + this.threadId);
        req.setRequestHeader("Content-type", "application/json");
        req.send(JSON.stringify({
            nickname: nickname,
            content: content,
            mail: mail,
            link: link, 
            forwardTo: forwardTo
        }));
    }

    function renderDwComment(comments) {
        this.node.innerHTML = "";
        this.node.appendChild(createElement("form", {
            className: "dwcomment-form",
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
                        '✔ 已加载 markdown-it' :
                        '✖ 未找到 <a href="//github.com/markdown-it/markdown-it" target="_blank">markdown-it</a>'
                }),
                createElement("label", {
                    className: "dwcomment-keep-field-label",
                    children: [
                        createElement("input", {
                            type: "checkbox",
                            className: "dwcomment-keep-field"
                        }),
                        "记住我的凭据（尚未实现）"
                    ]
                }),
                createElement("button", {
                    type: "button",
                    className: "dwcomment-publish",
                    textContent: "发布",
                    onclick: function () {
                        this.post(
                            this.node.querySelector("." + formNickname).value,
                            this.node.querySelector("." + formContent).value,
                            this.node.querySelector("." + formMail).value,
                            this.node.querySelector("." + formLink).value
                        );
                    }.bind(this)
                })
            ]
        }));
        this.node.appendChild(createElement("hr"));
        var commentList = createElement("div", {
            className: "dwcomment-list"
        });
        comments.forEach(function (comment) {
            commentList.appendChild(renderComment(comment));
        });
        this.node.appendChild(commentList);
        this.node.appendChild(createElement("div", {
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
            ]
        });
    }

    function renderUnavailable() {
        this.node.innerHTML = "";
        this.node.appendChild(createElement("div", {
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