var $ = function(queryString) {
    return document.querySelector(queryString);
};
var $$ = function(queryString) {
    return document.querySelectorAll(queryString);
};

document.addEventListener("DOMContentLoaded", function() {
    setAttrAll($$(".blackbar"), "title", "你知道的太多了");
});

function setClassAll(nodeList, className) {
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.add(className);
    }
}

function setAttrAll(nodeList, attrName, attrValue) {
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].setAttribute(attrName, attrValue);
    }
}

function getRandomColor() { 
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}