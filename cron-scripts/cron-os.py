import nmap3
import json

nmap = nmap3.Nmap()

results = nmap.nmap_os_detection("10.0.0.1-5") # MOST BE ROOTgg

with open("/var/log/nmap_os_results.json","a") as log:
    json.dump(results, log, indent=4)

