function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = callback;
    req.open("get", url);
    req.send();
}