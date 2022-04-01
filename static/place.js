let canvas;
function get_canvas() {
    canvas = document.getElementById("canvas").getContext('2d');
}

controls = {
    x: 0,
    y: 0,
    zoom: 1,
}

function load_text(text) {
    canvas.beginPath();
    canvas.rect(0, 0, 500, 500);
    canvas.fillStyle = '#2d2d2d';
    canvas.fill();
    canvas.font = "30px Arial";
    canvas.fillStyle = "white";
    canvas.textAlign = "center";
    canvas.textBaseline = "center";
    canvas.fillText(text, 250, 250);
}

function populate() {
    // Get pixels from frame_data.canvas
    for (const [pos, value] of Object.entries(frame_data.canvas)) {
        parts = pos.split(',')
        x = parseInt(parts[0])
        y = parseInt(parts[1])
        canvas.fillStyle = 'rgb('+value+')'
        canvas.fillRect(x*controls.zoom, y*controls.zoom, controls.zoom, controls.zoom)
    }
}

window.addEventListener('DOMContentLoaded', get_canvas);