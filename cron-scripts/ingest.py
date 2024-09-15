import json
import time
import os
import prometheus_client
from datetime import datetime, timezone

UP_FILE = "/var/log/json/nmap_up_results.json"

def get_time():
    now_utc = datetime.now(timezone.utc)

    iso_format = now_utc.isoformat()
    iso_format_with_z = iso_format.replace('+00:00', 'Z')
    return iso_format_with_z

def append_json_up(ip):
    if os.path.exists(UP_FILE):
        with open(UP_FILE, "r") as file:
            try:
                data = json.load(file)
                print(data)
                if not isinstance(data, list):
                    raise ValueError("JSON data is not a list of up results")
            except Exception as e:
                print(e)
                print("excption")
                data = []
    else:
        data = []
    
    found = False
    for entry in data:
        if entry["ip"] == ip:
            entry["count"] = entry["count"]+1
            found = True
            break

    if not found:
        data.append({"ip":ip,"count":1})
    
    with open(UP_FILE, "w") as file:
        json.dump(data, file, indent=4)


def append_json(path, entry):

    if os.path.exists(path):
        with open(path, "r") as file:
            try:
                data = json.load(file)
                if not isinstance(data, list):
                    raise ValueError("JSON data is not a list")
            except (json.JSONDecodeError, ValueError):
                data = []
    else:
        data = []
    runtime = entry.pop('runtime')
    stats = entry.pop('stats')
    task_results = entry.pop('task_results')
    for ip in entry.keys(): 
        if entry[ip]["state"]["state"] == "up":
            append_json_up(ip)

    entry_return = {"data":entry, "time":get_time(),"count":len(entry),"runtime":runtime,"task_results":task_results,"stats":stats}
    data.append(entry_return)

    with open(path, 'w') as file:
        json.dump(data, file, indent=4)



