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