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
        ajaxGet("/articles/about", renderMarkdown);
    } else {
        ajaxGet(window.location.hash.substring(1), renderMarkdown);
    }
}

function renderMarkdown() {
    if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
            $("#article").innerHTML = md.render(this.responseText);
        }
    }
}