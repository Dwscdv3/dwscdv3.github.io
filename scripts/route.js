var mainTitle = "I'm Dwscdv3";

var commentDisabled = '<p class="cm-text-banner">评论在此页上不可用</p>';

var path404 = "/404";
var pathHomePage = "/about";
var pathIndex = "/index";
var pathArticles = "/articles";

var routePipeline = [{
    regex: /(^$|^\/$)/,
    callback: function (args) {
        args.redirect = pathHomePage;
    }
}, {
    regex: new RegExp("^" + pathIndex + "(/(\\d+)?)?$"),
    callback: function (args) {
        if (!args.match[2]) {
            args.redirect = pathIndex + "/1";
            return;
        }
        var page = parseInt(args.match[2]);
        if (page > 0) {
            renderIndex(page);
        } else {
            args.redirect = path404;
        }
    }
}, {
    regex: new RegExp("^" + pathArticles + "/@(\\d+)$"),
    callback: function (args) {
        var id = args.match[1];
        switch (id) {
            case "1":
                args.redirect = pathHomePage;
                break;
            case "2":
                args.redirect = "/friendly-link";
                break;
            default:
                var article = articleList.find(function (article) {
                    return article.id == id;
                });
                if (article) {
                    args.redirect = pathArticles + "/" + article.fileName;
                } else {
                    args.redirect = path404;
                }
                break;
        }
    }
}];

document.addEventListener("DOMContentLoaded", route);
window.addEventListener("hashchange", route);
document.addEventListener("DOMContentLoaded", getIndex);
// Disabled due to GitHub Pages quota.
// window.addEventListener("hashchange", getIndex);

function route() {
    var path = getPath();
    var handled = false;
    var redirected = false;
    waitForIndex(function () {
        for (var i = 0; i < routePipeline.length; i++) {
            var rule = routePipeline[i];
            var match = path.match(rule.regex);
            if (match != null) {
                var args = {
                    handled: true,
                    match: match,
                    redirect: null
                };
                rule.callback(args);
                if (args.handled) {
                    handled = true;
                    if (args.redirect) {
                        redirected = true;
                        goTo(args.redirect, true);
                    }
                    break;
                }
            }
        }
        if (!handled) {
            if (path.startsWith("/")) {
                ajaxGet(window.location.hash.substring(1) + ".md", renderMarkdown);
            } else {
                goTo(path404);
            }
        }
        if (!redirected) {
            renderComment();
        }
    });
}

function getPath() {
    var argIndex = window.location.hash.indexOf("?");
    if (argIndex < 0) {
        return window.location.hash.substring(1);
    } else {
        return window.location.hash.substring(1, argIndex);
    }
}

function goTo(path, preserveArgs) {
    var args = "";
    if (preserveArgs) {
        var argIndex = window.location.hash.indexOf("?");
        if (argIndex >= 0) {
            args = window.location.hash.substring(argIndex);
        }
    }
    window.location.hash = "#" + path + args;
}

var articleList = null;

function getIndex() {
    ajaxGet("/articles/index.json", function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            var _articleList = JSON.parse(this.responseText);
            _articleList.forEach(function (article) {
                article.date = new Date(Date.parse(article.dateString));
            });

            _articleList.sort(function (a, b) {
                return b.date - a.date;
            });

            articleList = _articleList;

            renderRecentArticlesList();
        }
    });
}

function waitForIndex(callback) {
    if (articleList != null) {
        callback();
    } else {
        var i = setInterval(function () {
            if (articleList != null) {
                clearInterval(i);
                callback();
            }
        }, 50);
    }
}

var itemsPerPage = 10;

function renderIndex(page) {
    if (!page) {
        page = 1;
    }

    document.title = "文章索引" + " - " + mainTitle;
    $article.innerHTML = "<h1>文章索引</h1><br>";

    for (var i = (page - 1) * itemsPerPage; i < min(page * itemsPerPage, articleList.length); i++) {
        var index = document.createElement("div");
        index.classList.add("article");
        var title = document.createElement("h2");
        var anchor = document.createElement("a");
        anchor.appendChild(document.createTextNode(articleList[i].title));
        anchor.href = "#/articles/" + articleList[i].fileName;
        title.appendChild(anchor);
        index.appendChild(title);
        var date = document.createElement("date");
        date.appendChild(document.createTextNode(formatAlignedDate(articleList[i].date)));
        index.appendChild(date);
        $article.appendChild(index);
    }

    var pageControl = document.createElement("div");
    pageControl.classList.add("page-control");

    var prevPage = document.createElement("a");
    if (page <= 1) {
        prevPage.classList.add("anchor-disabled");
    }
    prevPage.addEventListener("click", function () {
        if (!this.classList.contains("anchor-disabled")) {
            if (page > 1) {
                goTo(pathIndex + "/" + (page - 1), true);
            }
        }
    });
    prevPage.appendChild(document.createTextNode("← 上一页 "));
    pageControl.appendChild(prevPage);

    var nextPage = document.createElement("a");
    if (page >= Math.ceil(articleList.length / itemsPerPage)) {
        nextPage.classList.add("anchor-disabled");
    }
    nextPage.addEventListener("click", function () {
        if (!this.classList.contains("anchor-disabled")) {
            goTo(pathIndex + "/" + (page + 1), true);
        }
    });
    nextPage.appendChild(document.createTextNode(" 下一页 →"));
    pageControl.appendChild(nextPage);

    $article.appendChild(pageControl);

    window.scrollTo(0, 0);
}

function renderRecentArticlesList() {
    var recentPostsList = $("#recentPosts");
    recentPostsList.innerHTML = "";
    for (var i = 0; i < min(5, articleList.length); i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#/articles/" + articleList[i].fileName;
        a.appendChild(document.createTextNode(articleList[i].shortTitle ? articleList[i].shortTitle : articleList[i].title));
        li.appendChild(a);
        recentPostsList.appendChild(li);
    }
    Ps.update(sidebar);
}