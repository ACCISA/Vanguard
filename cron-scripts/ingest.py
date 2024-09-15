import json
import os


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

    data.append(entry)

    with open(path, 'w') as file:
        json.dump(data, file, indent=4)



