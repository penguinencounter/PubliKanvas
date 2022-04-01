from json import dumps
from flask import Response


def t_jsonify(o):
    converted = dumps(o)
    return Response(response=converted, status=200, mimetype="application/json")
