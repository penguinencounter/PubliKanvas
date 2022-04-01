let canvas;
function get_canvas() {
    canvas = document.getElementById("canvas").getContext('2d');
}


function load_text(text) {
    canvas.font = "30px Arial";
    canvas.fillStyle = "white";
    canvas.textAlign = "center";
    canvas.textBaseline = "center";
    canvas.fillText(text, 10, 50);
}

function populate() {
    // Get pixels from frame_data.canvas

}

window.addEventListener('load', get_canvas);