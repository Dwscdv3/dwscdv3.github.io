function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = callback;
    req.open("get", url);
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
            separator = " ";
        }
        if (!largeSeparator) {
            largeSeparator = separator + " ";
        }
        var dateString = "";
        dateString += date.getUTCFullYear();
        dateString += date.getUTCMonth() < 10 ? largeSeparator : separator;
        dateString += date.getUTCMonth();
        dateString += date.getUTCDay() < 10 ? largeSeparator : separator;
        dateString += date.getUTCDay();
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