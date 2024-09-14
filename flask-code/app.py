from flask import Flask, render_template, request
import nmap
from json2html import *

app = Flask(__name__)

# Initialize nmap scanner
nm = nmap.PortScanner()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scan', methods=['POST'])
def scan():
    target = request.form.get('target')
    if target:
        # Run nmap scan on the target
        scan_result = nm.scan(hosts=target, arguments='-sV -sC -T4')
        
        # Parse the scan result
        readable_result = format_scan_result(scan_result)
        
        return render_template('result.html', result=readable_result)
    return "No target provided."

def format_scan_result(scan_result):
    # Use json2html to convert the scan result dictionary into an HTML table
    return json2html.convert(json=scan_result)

if __name__ == '__main__':
    app.run(debug=True)
