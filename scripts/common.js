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