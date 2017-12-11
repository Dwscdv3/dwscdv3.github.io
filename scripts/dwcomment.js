function DwComment(host, node) {
    this.host = host;
    this.node = node;
    this.threadId = undefined;

    this.load = function () {
        if (!this.threadId) {
            renderUnavailable();
        } else {
            this.threadId = parseInt(this.threadId);
            var self = this;
            if (this.threadId != NaN) {
                ajaxGet("//" + host + "/Threads/" + this.threadId, function () {
                    if (this.readyState == XMLHttpRequest.DONE &&
                        this.status >= 200 &&
                        this.status < 300) {
                        var comments = JSON.parse(this.responseText);
                        renderDwComment.bind(self)(comments);
                    }
                });
            }
        }
    }

    function renderDwComment(comments) {
        this.node.innerHTML = "";
        this.node.appendChild(createElement("div", {
            className: "dwcomment-post",
            children: [
                createElement("input", {
                    type: "text",
                    className: "dwcomment-nickname",
                    placeholder: "昵称"
                }),
                createElement("input", {
                    type: "text",
                    className: "dwcomment-mail",
                    placeholder: "邮箱（可选，用于接收通知）"
                }),
                createElement("input", {
                    type: "text",
                    className: "dwcomment-link",
                    placeholder: "链接（可选)"
                }),
                createElement("textarea", {
                    className: "dwcomment-content",
                    placeholder: "说点什么…",
                    rows: 3
                }),
                createElement("label", {
                    children: [
                        createElement("input", {
                            type: "checkbox",
                            className: "dwcomment-keep-field"
                        }),
                        "记住我的凭据（尚未实现）"
                    ]
                }),
                createElement("button", {
                    className: "dwcomment-publish",
                    textContent: "发布"
                })
            ]
        }));
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
                    textContent: comment.content
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