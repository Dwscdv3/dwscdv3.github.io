document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        document.body.style.backgroundColor = getRandomColor();
    }, 10);
    setInterval(function() {
        document.body.style.backgroundColor = getRandomColor();
    }, 5000);
});