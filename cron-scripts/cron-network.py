import nmap3
import json

nmap = nmap3.Nmap()
results = nmap3.NmapScanTechniques().nmap_ping_scan("10.0.0.1-5")


with open("/var/log/nmap_network_results.json","a") as log:
    json.dump(results, log, indent=4)



