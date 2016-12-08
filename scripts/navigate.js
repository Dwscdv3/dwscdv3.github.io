var prefixes = {
    articles: "#/articles/"
};

var md = window.markdownit("commonmark");
document.addEventListener("DOMContentLoaded", navigateToArticle);
window.addEventListener("hashchange", navigateToArticle);

document.addEventListener("DOMContentLoaded", function() {
    $("#homeButton").addEventListener("click", function() {
        window.location.hash = "#";
    });
});

function navigateToArticle() {
    if (window.location.hash.length <= 1) {
        ajaxGet("/about", renderMarkdown);
    } else {
        ajaxGet(window.location.hash.substring(1), renderMarkdown);
    }
}

function renderMarkdown() {
    if (this.readyState == XMLHttpRequest.DONE) {
        $(".cm-article").innerHTML = "";
        if (this.status >= 200 && this.status < 400) {
            $("#article").innerHTML = md.render(this.responseText);
            $(".cm-article").dataset.key = encodeURIComponent(window.location.hash);
            萌评.运转();
        } else if (this.status >= 400) {
            $("#article").innerHTML = md.render("# 404: Not found");
        }
    }
}