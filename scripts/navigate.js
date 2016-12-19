var homePage = "#/about";

var md = window.markdownit("commonmark");

document.addEventListener("DOMContentLoaded", navigateToArticle);
window.addEventListener("hashchange", navigateToArticle);
document.addEventListener("DOMContentLoaded", getRecentPosts);
window.addEventListener("hashchange", getRecentPosts);

// document.addEventListener("DOMContentLoaded", function() {
//     $("#homeButton").addEventListener("click", function() {
//         window.location.hash = "#";
//     });
// });

function navigateToArticle() {
    if (window.location.hash.length <= 1) {
        window.location.hash = homePage;
        return;
    }
    ajaxGet(window.location.hash.substring(1), renderMarkdown);
}

function getRecentPosts() {
    ajaxGet("/articles/index.json", function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            var posts = JSON.parse(this.responseText);
            posts.forEach(function(post) {
                post.date = Date.parse(post.dateString);
            });

            posts.sort(function(a, b) {
                return Date.parse(b.dateString) - Date.parse(a.dateString);
            });

            var recentPostsList = $("#recentPosts");
            recentPostsList.innerHTML = "";
            for (var i = 0; i < min(5, posts.length); i++) {
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.href = "#/articles/" + posts[i].fileName;
                a.appendChild(document.createTextNode(posts[i].title));
                li.appendChild(a);
                recentPostsList.appendChild(li);
            }
        }
    });
}

function renderMarkdown() {
    if (this.readyState == XMLHttpRequest.DONE) {
        $(".cm-article").innerHTML = "";
        if (this.status >= 200 && this.status < 400) {
            $("#article").innerHTML = md.render(this.responseText);
            window.scrollTo(0, 0);
            $(".cm-article").dataset.key = window.location.hash;
            document.title = $("h1").childNodes[0].textContent + " - I'm Dwscdv3";
            萌评.运转();
        } else if (this.status >= 400) {
            $("#article").innerHTML = md.render("# 404: Not found");
        }
    }
}