var mainTitle = "I'm Dwscdv3";

var commentDisabled = '<p class="cm-text-banner">评论在此页上不可用</p>';

var path404 = "/404";
var pathHomePage = "/about";
var pathIndex = "/index";
var pathArticles = "/articles";

var routePipeline = [{
    regex: /(^$|^\/$)/,
    callback: function () {
        goTo(pathHomePage, true);
    }
}, {
    regex: new RegExp("^" + pathIndex + "(/(\\d+)?)?$"),
    callback: function (args) {
        waitForIndex(function () {
            if (!args.match[2]) {
                goTo(pathIndex + "/1", true);
                return;
            }
            var page = parseInt(args.match[2]);
            if (page > 0) {
                renderIndex(page);
            } else {
                goTo(path404);
            }
        });
    }
}, {
    regex: new RegExp("^" + pathArticles + "/@(\\d+)$"),
    callback: function (args) {
        waitForIndex(function () {
            var article = articleList.find(function (article) {
                return article.id == args.match[1];
            });
            if (article) {
                goTo(pathArticles + "/" + article.fileName, true);
            } else {
                goTo(path404);
            }
        });
    }
}];

document.addEventListener("DOMContentLoaded", route);
window.addEventListener("hashchange", route);
document.addEventListener("DOMContentLoaded", getIndex);
// Disabled due to GitHub Pages quota.
// window.addEventListener("hashchange", getRecentPosts);

function route() {
    var argIndex = window.location.hash.indexOf("?");
    if (argIndex < 0) {
        var hash = window.location.hash.substring(1);
    } else {
        var hash = window.location.hash.substring(1, argIndex);
    }
    var handled = false;
    for (var i = 0; i < routePipeline.length; i++) {
        var rule = routePipeline[i];
        var match = hash.match(rule.regex);
        if (match != null) {
            var args = { handled: true, match: match };
            rule.callback(args);
            if (args.handled) {
                handled = true;
                break;
            }
        }
    }
    if (!handled) {
        if (hash.startsWith("/")) {
            ajaxGet(window.location.hash.substring(1), renderMarkdown);
        } else {
            goTo(path404);
        }
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
    $cmArticle.innerHTML = commentDisabled;
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
