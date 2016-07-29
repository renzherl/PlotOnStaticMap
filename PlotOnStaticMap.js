// top left point of the map we are using
var STARTLAT = 48.551780;
var STARTLNG = -4.973942;

// below function is from: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates?hl=zh-tw
var TILE_SIZE = 256;
var ZOOM = 3;

function project(lat, lng, zoom) {
    var siny = Math.sin(lat * Math.PI / 180);
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return {
        X: TILE_SIZE * (0.5 + lng / 360) * (1 << zoom),
        Y: TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)) * (1 << zoom)
    }
}

function plot() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);
    var lat = document.getElementById("lat").value;
    var lng = document.getElementById("lng").value;

    var start = project(STARTLAT, STARTLNG, ZOOM);
    var p = project(lat, lng, ZOOM);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(p.X - start.X, p.Y - start.Y, 5, 5);
}