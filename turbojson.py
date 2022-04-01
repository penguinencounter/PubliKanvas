from json import dumps
from flask import Response


def _t_jsonify():
    def hash_dict(d):
        return hash((tuple(d.keys()), tuple(d.values())))
    memo = {}   # cache
    def out(o):
        nonlocal memo
        h = hash_dict(o)
        if h in memo.keys():
            print(f'Cache hit for {h}')
            return Response(response=memo[h], status=200, mimetype='application/json')
        print(f'Cache miss for {h}')
        converted = dumps(o)
        memo[h] = converted
        return Response(response=converted, status=200, mimetype="application/json")
    return out
t_jsonify = _t_jsonify()
