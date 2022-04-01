frame_data = {
    version: -1,
    canvas: {}
};
async function get_server_version() {
    const req = await fetch('/getall/version');
    return await req.json();
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function download_all() {
    try {
        load_text('Loading data...');
        debug_el.innerHTML = 'waiting';
        let response;
        response = await (fetch('/getall').then(r => r.json()));
        load_text('Done.');
        frame_data.canvas = response;
    } catch (e) {
        alert(e.name)
        alert(e.message)
    }
    populate();
}
let debug_el;

function test_version() {
    debug_el = document.getElementById('debug');
    // fetch('/getall').then(r=>r.json()).then(j => {debug_el?.innerHTML = j+''}).catch(alert)
    download_all().then(() => {
        count = Object.keys(frame_data.canvas).length;
        debug_el.innerHTML = `Total count: ${count}`;
    });
}

window.addEventListener('load', test_version)
