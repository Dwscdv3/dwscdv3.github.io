var avatarContainer;

document.addEventListener("DOMContentLoaded", function() {
    avatarContainer = (function() {
        var images = $$("#avatarContainer img");
        var current = 0;

        var getCount = function() {
            return images.length;
        }

        var Next = function() {
            if (current < getCount() - 1) {
                var currentClone = current;
                images[currentClone].classList.add("clockwise-out");
                setTimeout(function() {
                    images[currentClone].classList.remove("clockwise-in");
                    images[currentClone].classList.remove("counter-clockwise-in");
                    images[currentClone].classList.remove("clockwise-out");
                    images[currentClone + 1].classList.add("clockwise-in");
                }, 500);
                current++;
            }
        }
        var Previous = function() {
            if (current > 0) {
                var currentClone = current;
                images[currentClone].classList.add("counter-clockwise-out");
                setTimeout(function() {
                    images[currentClone].classList.remove("clockwise-in");
                    images[currentClone].classList.remove("counter-clockwise-in");
                    images[currentClone].classList.remove("counter-clockwise-out");
                    images[currentClone - 1].classList.add("counter-clockwise-in");
                }, 500);
                current--;
            }
        }

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

    setTimeout(function() {
        document.body.style.backgroundColor = getRandomColor();
        setInterval(function() {
            document.body.style.backgroundColor = getRandomColor();
        }, 5000);
    }, 17);
});