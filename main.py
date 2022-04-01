from flask import Flask, request, render_template
from turbojson import t_jsonify
import string
import json
import random
app = Flask('app')

canvas_frames = [
]
version = 0
canvas = {}

@app.route('/getall/count')
def get_tile_count():
    return t_jsonify(len(canvas))
@app.route('/getall')
def get_canvas():
    print('Download all requested')
    r = t_jsonify(canvas)
    r.headers['Content-Length'] = len(json.dumps(canvas))+1
    return r
@app.route('/getall/version')
def get_version():
    r = t_jsonify(version)
    return r


def generate_blank_canvas(w, h):
    built = {}
    total = w * h
    done = 0
    for x in range(w):
        for y in range(h):
            done += 1
            if done % 1000 == 0:
                print('\b'*51, end='', flush=True)
                print(f'Generate blank frame: {done}/{total} {round(done/total*100, 2)}%'.ljust(50), end='', flush=True)
            built[f'{x},{y}'] = (255, 255, 255)
    print('...done')
    return built


code = ''
@app.route('/reinit', methods=('GET', 'POST'))
def reinit():
    global code, canvas_frames, canvas, version
    if request.method == 'GET':
        code = ''
        for x in range(10):
            code += random.choice(string.ascii_lowercase)
        print(f'The code is {code}')
        return render_template('re_init.html', status='ask')
    else:
        try:
            print(request.form)
            if request.form['code'] != code:
                return render_template('re_init.html', status='fail')
            else:
                blank = generate_blank_canvas(1000, 1000)
                canvas_frames = []
                canvas_frames.append(blank)
                canvas = blank
                version = 0
                return render_template('re_init.html', status='done')
        except KeyError:
            return render_template('re_init.html', status='fail')

@app.route('/')
def root():
    return render_template('index.html')

app.run(host='0.0.0.0', port=8080)