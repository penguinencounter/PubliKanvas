frame_data = {
    version: -1,
    canvas: {}
};
async function get_server_version() {
    const req = await fetch('/getall/version');
    return await req.json();
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function progress({loaded, total}) {
  debug_el.innerHTML = Math.round(loaded/total*100)+'%';
}

async function download_all() {
    debug_el.innerHTML = 'Waiting for server...';
    let response = await fetch('/getall');
    debug_el.innerHTML = 'Recieving data...';
    response = await response.json();

    debug_el.innerHTML = 'Done.';
    frame_data.canvas = response;
}
let debug_el;

function test_version() {
    debug_el = document.getElementById('debug');
    download_all().then(() => {
        count = Object.keys(frame_data.canvas).length;
        debug_el.innerHTML = `Total count: ${count}`;
    });
}

window.addEventListener('load', test_version)