var PATH_BACKGROUND_DESKTOP = "/images/backgrounds/desktop/";
var PATH_BACKGROUND_MOBILE = "/images/backgrounds/mobile/";

var avatarContainer;

var sidebar;

var $article, $commentInfo;

document.addEventListener("DOMContentLoaded", function() {
    $article = $("#article");
    $commentInfo = $(".comment-info");

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

    $("#settingIcon").addEventListener("click", function() {
        this.classList.toggle("spin180");
        $("#settingPanel").classList.toggle("setting-hide");
    });
    $("#setting_Blur").addEventListener("click", function() {
        toggleBlur();
    });
    $("#setting_Shadow").addEventListener("click", function() {
        toggleShadow();
    });
    $("#setting_Transition").addEventListener("click", function() {
        toggleTransition();
    });
    $("#setting_HighContrast").addEventListener("click", function() {
        toggleHighContrast();
    });

    IsEdgeThen(function() {
        $("html").style.overflow = "hidden";
        $("html").style.height = "100%";
        document.body.style.overflow = "auto";
        document.body.style.height = "100%";
    });
    setBackground();
    setBlur();

    sidebar = $("header");
    Ps.initialize(sidebar, {
        wheelSpeed: 0.5,
        swipePropagation: false
    });
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
    Ps.update(sidebar);
}

function setBackground() {
    ajaxGet((window.innerWidth >= window.innerHeight ? PATH_BACKGROUND_DESKTOP : PATH_BACKGROUND_MOBILE) + "index.json", function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                var $bg = $("#background"),
                    $title = $("#bginfo-title"),
                    $author = $("#bginfo-author"),
                    $src = $("#bginfo-src"),
                    $labelAuthor = $("#bginfo-label-author"),
                    $labelSrc = $("#bginfo-label-src");

                $labelAuthor.parentNode.hidden = true;
                $labelSrc.parentNode.hidden = true;

                var bgList = JSON.parse(this.responseText);
                var bg = bgList[Math.floor(Math.random() * bgList.length)];

                if (typeof bg.prop === "string") {
                    var props = bg.prop.split(" ");
                    if (props.contains("tile")) {
                        $bg.classList.add("background-tile");
                    }
                }

                if (bg.fileName) {
                    $bg.style.backgroundImage = "url(" + (window.innerWidth >= window.innerHeight ? PATH_BACKGROUND_DESKTOP : PATH_BACKGROUND_MOBILE) + bg.fileName + ")";
                } else if (bg.url) {
                    $bg.style.backgroundImage = "url(" + bg.url + ")";
                }

                if (!bg.srcType || bg.srcType === "none" || bg.srcType === "original") {
                    $title.textContent = bg.title;
                } else if (bg.srcType === "text") {
                    $title.textContent = bg.title;
                    $src.textContent = bg.srcText;
                    $labelSrc.parentNode.hidden = false;
                } else if (bg.srcType === "url") {
                    $title.innerHTML = '<a href="' + bg.src + '" target="_blank">' + bg.title + "</a>";
                } else if (bg.srcType === "pixiv") {
                    $title.innerHTML = '<a href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + bg.src + '" target="_blank">' + bg.title + "</a>";
                }

                if (bg.author) {
                    $author.textContent = bg.author;
                    $labelAuthor.parentNode.hidden = false;
                } else if (bg.srcType === "original") {
                    $author.innerHTML = "<em>原创</em>";
                    $labelAuthor.style.visibility = hidden;
                    $labelAuthor.parentNode.hidden = false;
                }
            }
        }
    });
}

var highContrast = false;

function toggleHighContrast() {
    // TODO: Control state

    highContrast = !highContrast;

    var bg = $("#background");

    if (highContrast) {
        bg.style.opacity = "0";
        document.documentElement.style.color = "white";
        $("#settingPanel").style.backgroundColor = "#333";
        $("#footerBackground").style.borderBottomColor = "#333";
    } else {
        bg.style.opacity = "";
        document.documentElement.style.color = "";
        $("#settingPanel").style.backgroundColor = "";
        $("#footerBackground").style.borderBottomColor = "";
    }
}

var blur = true;

function toggleBlur() {
    blur = !blur;
    setBlur();
}

Object.defineProperty(this, "isBlurred", {
    get: function() {
        return blur;
    },
    set: function(val) {
        blur = val;
        setBlur();
    }
});

function setBlur() {
    var bg = $("#background");
    if (blur) {
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

var shadow = true;

function toggleShadow() {
    shadow = !shadow;

    if (shadow) {
        document.documentElement.style.textShadow = "";
    } else {
        document.documentElement.style.setProperty("text-shadow", "none", "important");
    }
}

var transition = true;
var style_DisableTransition = document.createElement("style");
style_DisableTransition.innerHTML = "* { transition: initial !important }";

function toggleTransition() {
    transition = !transition;

    if (transition) {
        document.body.removeChild(style_DisableTransition);
    } else {
        document.body.appendChild(style_DisableTransition);
    }
}