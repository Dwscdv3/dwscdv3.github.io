var md = window.markdownit({
    html: true,
    xhtmlOut: false,
    breaks: false,
    linkify: true,
    typographer: false,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) { }
        }
        return '';
    }
});
md.linkify.tlds(".sh", false);
md.linkify.tlds(".py", false);

function renderMarkdown() {
    if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status >= 200 && this.status < 400) {
            $article.innerHTML = md.render(this.responseText);
            replaceLinksToTargetBlank($article);
            window.scrollTo(0, 0);
            document.title = $("h1").childNodes[0].textContent + " - " + mainTitle;
            activateScript($article);
            TitleNavigation.load();
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