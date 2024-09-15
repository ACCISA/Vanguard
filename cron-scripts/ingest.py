import json
import time
import os
from datetime import datetime, timezone

def get_time():

    now_utc = datetime.now(timezone.utc)

    iso_format = now_utc.isoformat()
    iso_format_with_z = iso_format.replace('+00:00', 'Z')
    return iso_format_with_z

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
    entry_return = {"data":entry, "time":get_time(),"count":len(entry),"runtime":runtime,"task_results":task_results,"stats":stats}
    data.append(entry_return)

    with open(path, 'w') as file:
        json.dump(data, file, indent=4)



