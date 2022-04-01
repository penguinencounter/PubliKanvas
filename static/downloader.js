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
  document.getElementById('debug').innerHTML = Math.round(loaded/total*100)+'%';
}

async function download_all() {
    document.getElementById('debug').innerHTML = `Preparing data...`;
    let response = await fetch('/getall');
    document.getElementById('debug').innerHTML = `Recieving data...`;
    let ndata = await response.json();
    document.getElementById('debug').innerHTML = `Done.`;
    frame_data.canvas = ndata;
}


function test_version() {
    download_all().then(() => {
        count = Object.keys(frame_data.canvas).length;
        document.getElementById('debug').innerHTML = `Total count: ${count}`;
    });
}

window.addEventListener('load', test_version)