var PATH_BACKGROUND_DESKTOP = "/images/backgrounds/desktop/";
var PATH_BACKGROUND_MOBILE = "/images/backgrounds/mobile/";

var avatarContainer;

document.addEventListener("DOMContentLoaded", function() {
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

    // setTimeout(function() {
    //     document.body.style.backgroundColor = getRandomColor();
    //     setInterval(function() {
    //         document.body.style.backgroundColor = getRandomColor();
    //     }, 5000);
    // }, 17);

    if (window.innerWidth >= window.innerHeight) {
        ajaxGet(PATH_BACKGROUND_DESKTOP + "index.json", function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    var bgList = JSON.parse(this.responseText);
                    $("#background").src = PATH_BACKGROUND_DESKTOP + bgList[Math.floor(Math.random() * bgList.length)];
                }
            }
        });
    } else {
        ajaxGet(PATH_BACKGROUND_MOBILE + "index.json", function() {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    var bgList = JSON.parse(this.responseText);
                    $("#background").src = PATH_BACKGROUND_MOBILE + bgList[Math.floor(Math.random() * bgList.length)];
                }
            }
        });

    }
    setBlur();
});
window.addEventListener("resize", setBlur);

function setBlur() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var depth = (width * 0.5 + height * 0.5) / 200;
    var bg = $("#background");
    bg.style["-webkit-filter"] = "blur(" + depth.toFixed(2) + "px)";
    bg.style["filter"] = "blur(" + depth.toFixed(2) + "px)";
}