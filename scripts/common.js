var $ = function(queryString) {
    return document.querySelector(queryString);
};

var $$ = function(queryString) {
    return document.querySelectorAll(queryString);
};

function ajaxGet(url, callback) {
    if (url[0] == '/') {
        url = url.substring(1);
    }
    var req = new XMLHttpRequest();
    req.onreadystatechange = callback;
    req.open("GET", url);
    req.send();
}

function max(a, b) {
    return a > b ? a : b;
}

function min(a, b) {
    return a > b ? b : a;
}

function formatAlignedDate(date, separator, largeSeparator) {
    if (date instanceof Date) {
        if (!separator) {
            separator = "  ";
        }
        if (!largeSeparator) {
            largeSeparator = separator + " ";
        }
        var dateString = "";
        dateString += date.getUTCFullYear() % 100;
        dateString += date.getUTCMonth() < 10 ? largeSeparator : separator;
        dateString += date.getUTCMonth() + 1;
        dateString += date.getUTCDate() < 10 ? largeSeparator : separator;
        dateString += date.getUTCDate();
        return dateString;
    } else {
        throw "Illegal param type: Date expected";
    }
}

function Then(func) {
    var newArgs = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
        newArgs[i - 1] = arguments[i];
    }
    func.apply(null, newArgs);
}

function IsEdgeThen() {
    if (navigator.userAgent.indexOf("Edge") > -1) {
        Then.apply(null, arguments);
    }
}

function NotInputingThen(func) {
    if (!(document.activeElement instanceof HTMLTextAreaElement) &&
        !(document.activeElement instanceof HTMLInputElement)) {
        Then.apply(null, arguments);
    }
}

function scrollToBottom(node) {
    node.scrollTop = node.scrollHeight;
}

// Polyfills
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}
if (!Array.prototype.contains) {
    Array.prototype.contains = function (element) {
        return this.indexOf(element) > -1;
    };
}
if (!Number.prototype.pad) {
    Number.prototype.pad = function (size) {
        var s = String(this);
        while (s.length < (size || 2)) {
            s = "0" + s;
        }
        return s;
    };
}