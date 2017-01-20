var PATH_BACKGROUND_DESKTOP = "/images/backgrounds/desktop/";
var PATH_BACKGROUND_MOBILE = "/images/backgrounds/mobile/";

var avatarContainer;

var sidebar;

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("keydown", function(e) {
        if (e.ctrlKey && e.key == "b") {
            isBlurred = !isBlurred;
            setBlur();
        }
    });

    sidebar = $("#left");
    Ps.initialize(sidebar, {
        swipePropagation: false
    });

    getTips();
    $("#tip").addEventListener("mousedown", nextTip);

    avatarContainer = (function() {
        var current = 0;

        var getCount = function() {
            var images = $$("#avatarContainer img");
            return images.length;
        }

        var Next = function() {
            if (current < getCount() - 1) {
                var images = $$("#avatarContainer img");
                var currentClone = current;
                images[currentClone].classList.add("clockwise-out");
                setTimeout(function() {
                    images[currentClone].className = "avatar-img";
                    // images[currentClone].classList.remove("clockwise-in");
                    // images[currentClone].classList.remove("counter-clockwise-in");
                    // images[currentClone].classList.remove("clockwise-out");
                    images[currentClone + 1].classList.add("clockwise-in");
                }, 300);
                current++;
            }
        }
        var Previous = function() {
            if (current > 0) {
                var images = $$("#avatarContainer img");
                var currentClone = current;
                images[currentClone].classList.add("counter-clockwise-out");
                setTimeout(function() {
                    images[currentClone].className = "avatar-img";
                    // images[currentClone].classList.remove("clockwise-in");
                    // images[currentClone].classList.remove("counter-clockwise-in");
                    // images[currentClone].classList.remove("counter-clockwise-out");
                    images[currentClone - 1].classList.add("counter-clockwise-in");
                }, 300);
                current--;
            }
        }

        var images = $$("#avatarContainer img");
        images[0].classList.add("clockwise-in");

        return {
            Next: Next,
            Previous: Previous,
        }
    })();

    $("#avatarPrevious").addEventListener("click", function() {
        avatarContainer.Previous();
    });
    $("#avatarNext").addEventListener("click", function() {
        avatarContainer.Next();
    });

    IsEdgeThen(function() {
        $("html").style.overflow = "hidden";
        $("html").style.height = "100%";
        document.body.style.overflow = "auto";
        document.body.style.height = "100%";
    });
    setBackground();
    setBlur();
});
window.addEventListener("resize", function() {
    Ps.update(sidebar);
    setBlur();
});

var tips = null;

function getTips() {
    ajaxGet("/tips", function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            tips = this.responseText.split("\n");
            nextTip();
        }
    });
}

var tipFirstShow = true;

function nextTip() {
    $("#tip").innerHTML = tips[Math.floor(Math.random() * tips.length)];
    if (tipFirstShow) {
        tipFirstShow = false;
    } else {
        scrollToBottom($("#left"));
    }
}

function setBackground() {
    if (window.innerWidth >= window.innerHeight) {
        ajaxGet(PATH_BACKGROUND_DESKTOP + "index.json", function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    var bgList = JSON.parse(this.responseText);
                    $("#background").style.backgroundImage = "url(" + PATH_BACKGROUND_DESKTOP + bgList[Math.floor(Math.random() * bgList.length)] + ")";
                }
            }
        });
    } else {
        ajaxGet(PATH_BACKGROUND_MOBILE + "index.json", function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    var bgList = JSON.parse(this.responseText);
                    $("#background").style.backgroundImage = "url(" + PATH_BACKGROUND_MOBILE + bgList[Math.floor(Math.random() * bgList.length)] + ")";
                }
            }
        });
    }
}

function toggleBackground() {
    var bg = $("#background");
    if (bg.style.opacity == "" || bg.style.opacity > 0) {
        bg.style.opacity = "0";
    } else {
        bg.style.opacity = "1";
    }
}

var _isBlurred = true;
Object.defineProperty(this, "isBlurred", {
    get: function() {
        return _isBlurred;
    },
    set: function(val) {
        _isBlurred = val;
        setBlur();
    }
});

function setBlur() {
    var bg = $("#background");
    if (_isBlurred) {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var depth = (width * 0.5 + height * 0.5) / 200;
        bg.style.webkitFilter = "blur(" + depth.toFixed(2) + "px)";
        bg.style.filter = "blur(" + depth.toFixed(2) + "px)";
    } else {
        bg.style.webkitFilter = "none";
        bg.style.filter = "none";
    }
}