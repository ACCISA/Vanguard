#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = "/var/log/json"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

os.chdir(DIRECTORY)

handler = CustomHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), handler)

print(f"Serving HTTP on port {PORT} from directory {DIRECTORY}")
httpd.serve_forever()
