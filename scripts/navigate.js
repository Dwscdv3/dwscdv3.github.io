var prefixes = {
    articles: "#/articles/"
};

document.addEventListener("DOMContentLoaded", navigateToArticle);
document.addEventListener("hashchange", navigateToArticle);

function navigateToArticle() {
    setTimeout(function() {
        if (window.location.hash.length <= 1) {
            ajaxGet("/articles/about.md", function() {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (this.status == 200) {
                        var md = window.markdownit("commonmark");
                        $("#main").innerHTML = md.render(this.responseText);
                    }
                }
            });
        }
        if (window.location.hash.startsWith(prefixes.articles)) {
            ajaxGet(window.location.hash.substring(1) + ".md", function() {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (this.status == 200) {
                        var md = window.markdownit("commonmark");
                        $("#main").innerHTML = md.render(this.responseText);
                    }
                }
            });
        }
    }, 0);
}