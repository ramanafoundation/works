$(function () {
    jQuery.fn.carousel = function () {
        var that = $(this),
            urls = [
                "https://1.bp.blogspot.com/-5QO_W7rBA6M/XJDPWdW8_AI/AAAAAAAANVw/GhhbQVX2rQM3AynPDKl9IC0thK2LNugxwCLcBGAs/s1600/Ramana%2BMaharshi%2Bat%2BArunachalam.JPG",
                "https://www.dagadevelopers.com/wp-content/uploads/2020/12/ramana.jpg",
                "https://ropeandsnake.files.wordpress.com/2020/07/ramana-younger-face.jpg?w=591"
            ];

        that.each(function () {
            var current = $(this),
                image = current.find("img"),
                index = current.data("index"),
                currentSrc = image.attr("src");

            if (index == null) {
                index = 0;
            }
            if (index > urls.length) {
                index = 0;
            }
            if (currentSrc == null) {
                image.attr("src", urls[0]);
                image.show();
            } else {
                image.animate({
                        opacity: 0
                    },
                    1000,
                    function () {
                        index++;
                        image.attr("src", urls[index]);
                        current.data("index", index);

                        setTimeout(function () {
                            image.animate({
                                opacity: 1
                            }, 1000);
                        }, 1000);
                    });
            }


        });
    };
});