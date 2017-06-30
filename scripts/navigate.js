var mainTitle = "I'm Dwscdv3"

var commentDisabled = '<p class="cm-text-banner">评论在此页上不可用</p>';

var hash404 = "#/404";
var hashHomePage = "#/about";
var hashIndex = "#/index";

var md = window.markdownit("commonmark");

document.addEventListener("DOMContentLoaded", navigateToArticle);
window.addEventListener("hashchange", navigateToArticle);
document.addEventListener("DOMContentLoaded", getIndex);
// Disabled due to GitHub Pages quota.
// window.addEventListener("hashchange", getRecentPosts);

// document.addEventListener("DOMContentLoaded", function() {
//     $("#homeButton").addEventListener("click", function() {
//         window.location.hash = "#";
//     });
// });

function navigateToArticle() {
    if (window.location.hash.length <= 1) {
        window.location.hash = hashHomePage;
        return;
    }
    if (window.location.hash == hashIndex) {
        window.location.hash = hashIndex + "/1";
        return;
    }
    if (window.location.hash.startsWith(hashIndex + "/")) {
        if (articleList != null) {
            routeIndex();
        }
        return;
    }
    ajaxGet(window.location.hash.substring(1), renderMarkdown);
}

var articleList = null;

function getIndex() {
    ajaxGet("/articles/index.json", function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            var _articleList = JSON.parse(this.responseText);
            _articleList.forEach(function(article) {
                article.date = new Date(Date.parse(article.dateString));
            });

            _articleList.sort(function(a, b) {
                return b.date - a.date;
            });

            articleList = _articleList;

            renderRecentArticlesList();
            if (window.location.hash.startsWith(hashIndex + "/")) {
                routeIndex();
            }
        }
    });
}

function routeIndex() {
    var page = parseInt(window.location.hash.substring(hashIndex.length + 1));
    if (page != NaN) {
        renderIndex(page);
    } else {
        window.location.hash = hash404;
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
    prevPage.addEventListener("click", function() {
        if (!this.classList.contains("anchor-disabled")) {
            if (page > 1) {
                window.location.hash = hashIndex + "/" + (page - 1);
            }
        }
    });
    prevPage.appendChild(document.createTextNode("← 上一页 "));
    pageControl.appendChild(prevPage);

    var nextPage = document.createElement("a");
    if (page >= Math.ceil(articleList.length / itemsPerPage)) {
        nextPage.classList.add("anchor-disabled");
    }
    nextPage.addEventListener("click", function() {
        if (!this.classList.contains("anchor-disabled")) {
            window.location.hash = hashIndex + "/" + (page + 1);
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

function renderMarkdown() {
    if (this.readyState == XMLHttpRequest.DONE) {
        $cmArticle.innerHTML = "";
        if (this.status >= 200 && this.status < 400) {
            $article.innerHTML = md.render(this.responseText);
            replaceLinksToTargetBlank($article);
            window.scrollTo(0, 0);
            $cmArticle.dataset.key = encodeURI(window.location.hash);
            document.title = $("h1").childNodes[0].textContent + " - " + mainTitle;
            try {
                萌评.运转();
            } catch (ex) {
                $cmArticle.innerHTML = '<div class="cm-text-banner">萌评论挂了</div>';
            }
            activateScript($article);
        } else if (this.status >= 400) {
            $article.innerHTML = md.render("# 404: Not found");
            document.title = "404" + " - " + mainTitle;
        }
    }
}

function replaceLinksToTargetBlank(node) {
    if (node instanceof HTMLElement) {
        var anchors = node.querySelectorAll("a");
        for (var i = 0; i < anchors.length; i++) {
            anchors[i].target = "_blank";
        }
    }
}

function activateScript(node) {
    if (node instanceof HTMLElement) {
        var oldNodes = node.querySelectorAll("script");
        for (var i = 0; i < oldNodes.length; i++) {
            var oldNode = oldNodes[i];
            var newNode = document.createElement("script");
            newNode.textContent = oldNode.textContent;
            oldNode.parentNode.removeChild(oldNode);
            node.appendChild(newNode);
        }
    }
}