var threadIdPipeline = [{
    regex: /^\/articles\/(.+)$/,
    callback: function (args) {
        for (var i = 0; i < articleList.length; i++) {
            if (articleList[i].id == args.match[1]) {
                return articleList[i].id;
            }
        }
    }
}, {
    regex: /^\/about$/,
    callback: function () {
        return 1;
    }
}, {
    regex: /^\/friendly\-link$/,
    callback: function () {
        return 2;
    }
}];

var dwComment = null;

document.addEventListener("DOMContentLoaded", function () {
    dwComment = new DwComment("comment.dwscdv3.com", document.getElementById("DwComment"));
});
document.addEventListener("DOMContentLoaded", renderComment);
window.addEventListener("hashchange", renderComment);

function renderComment() {
    var path = getPath();
    var handled = false;
    var threadId = 0;
    for (var i = 0; i < threadIdPipeline.length; i++) {
        var rule = threadIdPipeline[i];
        var match = path.match(rule.regex);
        if (match != null) {
            var args = { handled: true, match: match };
            threadId = rule.callback(args);
            if (args.handled) {
                handled = true;
                break;
            }
        }
    }
    dwComment.threadId = threadId;
    dwComment.load();
}