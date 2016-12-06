function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.onload = callback;
    req.open("get", url);
    req.send();
}