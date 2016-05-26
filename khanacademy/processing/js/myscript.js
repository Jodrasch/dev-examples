
$(document).ready(function() {
    var processing;

    $(window).resize(function () {
        var canvasWidth = parseInt($('#canvas').css('width'));
        var canvasHeight = parseInt($('#canvas').css('height'));
        processing.size(canvasWidth, canvasHeight);
    });

    var canvasWidth = parseInt($('#canvas').css('width'));
    var canvasHeight = parseInt($('#canvas').css('height'));

    processing = new Processing(canvas, function(processing) {
        processing.size(canvasWidth, canvasHeight);
        processing.background(0xFFF);

        var mouseIsPressed = false;
        processing.mousePressed = function () { mouseIsPressed = true; };
        processing.mouseReleased = function () { mouseIsPressed = false; };

        var keyIsPressed = false;
        processing.keyPressed = function () { keyIsPressed = true; };
        processing.keyReleased = function () { keyIsPressed = false; };

        function getImage(s) {
            var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
            processing.externals.sketch.imageCache.add(url);
            return processing.loadImage(url);
        }

        // use degrees rather than radians in rotate function
        var rotateFn = processing.rotate;
        processing.rotate = function (angle) {
            rotateFn(processing.radians(angle));
        };

        with (processing) {

            // ECRIVEZ VOTRE PROGRAMME ICI
            var NB_POINTS = 20;

            // Rayon et diamètre des points
            var RADIUS = 2;
            var DIAMETER = RADIUS * 2;

            // le nombre de connexion max
            var NB_CONNECTIONS_MAX = 2;

            // Un tableau qui contient tous les points. Chaque élément
            // est un couple x, y
            var points = [];

            // On positionne les points de manière aléatoire sur l'écran
            for (var i = 0; i < NB_POINTS; i++) {
                var point = {
                  x: floor(random(0, width)), y: floor(random(0, height)),
                  depX: random(-1, 1), depY: random(-1,1), connectedTo: []
                };

                for (var j = 0, numberOfConnections = floor(random(1,NB_CONNECTIONS_MAX));
                     j < numberOfConnections;
                     j++)
                {
                    point.connectedTo.push(floor(random(0, NB_POINTS)));
                }
                points.push(point);
            }


            var touchingSide = function(pos, canvasDimension, objectSize) {
                return ((pos - objectSize) < 0) || ((pos + objectSize) > canvasDimension);
            }

            var draw = function() {
                fill(255, 0, 0);
                background(255, 255, 255);

                points.forEach(function(currentPoint) {
                    ellipse(currentPoint.x, currentPoint.y, 10, 10);

                    // Dessine les connexions
                    /*
                    currentPoint.connectedTo.forEach(function(connectionIndex) {
                        line(points[connectionIndex].x,
                             points[connectionIndex].y,
                             currentPoint.x, currentPoint.y);
                    });
                    */

                    currentPoint.x += currentPoint.depX;
                    currentPoint.y += currentPoint.depY;

                    if (touchingSide(currentPoint.x, width, RADIUS)) {
                        currentPoint.depX = -currentPoint.depX;
                    }

                    if (touchingSide(currentPoint.y, height, RADIUS)) {
                        currentPoint.depY = -currentPoint.depY;
                    }
                });
            };

            // NE CHANGEZ RIEN AU TEXTE QUI SUIT
        }
        if (typeof draw !== 'undefined') processing.draw = draw;
    });
});
