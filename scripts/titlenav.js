var TitleNavigation = (function () {

    var panel = null;
    var tags = ["h1", "h2", "h3", "h4", "h5", "h6"];
    var excludes = ["date"];

    document.addEventListener("DOMContentLoaded", function () {
        panel = $("#titlePanel");
    });

    function load() {
        panel.innerHTML = "";
        var headers = Array.from($("article").children).filter(function (element) {
            return tags.indexOf(element.tagName.toLowerCase()) >= 0;
        });
        var lastLevel = 0;
        var lastNode = panel;
        headers.forEach(function (header) {
            var level = parseInt(header.tagName.charAt(1));
            var li = getListItem(header);
            if (level > lastLevel) {
                var ol = document.createElement("ol");
                ol.appendChild(li);
                lastNode.appendChild(ol);
            } else if (level === lastLevel) {
                lastNode.parentNode.appendChild(li);
            } else {
                for (var i = 0; i < lastLevel - level; i += 1) {
                    lastNode = lastNode.parentNode.parentNode;
                }
                lastNode.parentNode.appendChild(li);
            }
            lastLevel = level;
            lastNode = li;
        });
    }

    function getListItem(header) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        var hash = location.hash;
        if (hash.lastIndexOf("#") > 0) {
            hash = hash.substr(0, hash.lastIndexOf("#"));
        }
        a.innerHTML = header.innerHTML;
        Array.from(a.children).forEach(function (element) {
            if (excludes.indexOf(element.tagName.toLowerCase()) >= 0) {
                a.removeChild(element);
            }
        });
        if (useHashbang) {
            a.href = hash + "#" + encodeURIComponent(a.textContent.trim());
        } else {
            a.href = location.origin + location.pathname + location.search + "#" + encodeURIComponent(a.textContent.trim());
        }
        li.appendChild(a);
        return li;
    }

    return {
        load: load,
    };
})();