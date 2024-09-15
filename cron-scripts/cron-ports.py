import json
import csv
import nmap
import os

UP_FILE = '/var/log/json/nmap_up_results.json'
CSV_FILE = '/var/log/json/nmap_ports.csv'

def read_up_file():
    
    if os.path.exists(UP_FILE):
        with open(UP_FILE, "r") as file:
            try:
                data = json.load(file)
                if not isinstance(data, list):
                    raise ValueError("invalid jsond data for open ports")
            except Exception as e:
                print(e)
                data = []
    else:
        data = []

    return data


data = read_up_file()
nm = nmap.PortScanner()
f = open(CSV_FILE,"a")
idx = 0
for machine in data:
    nm.scan(machine['ip'],'20-513')
    lines = nm.csv().split('\n')
    for line in lines:
        if idx == 0:
            f.write(line+"\n")
            idx = 1
            continue
        if "hostname_type" in line: continue
        f.write(line+"\n")

f.close()

