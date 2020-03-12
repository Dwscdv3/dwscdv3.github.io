var threadIdPipeline = [{
    regex: /^\/articles\/(.+)$/,
    callback: function (args) {
        for (var i = 0; i < articleList.length; i++) {
            if (articleList[i].fileName == args.match[1]) {
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
    regex: /^\/links$/,
    callback: function () {
        return 2;
    }
}];

var dwComment = null;

document.addEventListener("DOMContentLoaded", function () {
    dwComment = new DwComment("https://comment.dwscdv3.com", document.getElementById("DwComment"));
});

function renderComment() {
    var url = getURLParts();
    var threadId = 0;
    waitForIndex(function () {
        for (var i = 0; i < threadIdPipeline.length; i++) {
            var rule = threadIdPipeline[i];
            var match = url.path.match(rule.regex);
            if (match != null) {
                var args = {
                    handled: true,
                    match: match
                };
                threadId = rule.callback(args);
                if (args.handled) {
                    break;
                }
            }
        }
        dwComment.threadId = threadId;
        dwComment.load(function (e) {
            if (e.success && url.options.Comment) {
                var focusComment = document.getElementById("comment-" + url.options.Comment);
                if (focusComment) {
                    focusComment.scrollIntoView({ behavior: "smooth" });
                    focusComment.style.backgroundColor = "rgba(255, 191, 0, 0.3)";
                }
            }
        });
    });
}

function commentUnavailable() {

}
