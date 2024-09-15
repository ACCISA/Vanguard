import nmap3
import json

from prometheus_client import CollectorRegistry, Counter, Gauge, generate_latest
import re
import os

METRICS_FILE = '/var/log/prom/network_counter.prom'

def parse_metrics_file():
    if not os.path.exists(METRICS_FILE):
        return 0.0  # Default values if file does not exist

    with open(METRICS_FILE, 'r') as f:
        content = f.read()
    
    counter_match = re.search(r'^os_counter_total\s+(\d+\.?\d*)$', content, re.MULTILINE)

    current_counter = float(counter_match.group(1)) if counter_match else 0.0

    return current_counter

def increment_and_save_counter():
    # Parse the existing metrics file
    current_counter = parse_metrics_file()
    print("current counter: ",current_counter)

    # Create a registry and define metrics
    registry = CollectorRegistry()
    REQUESTS = Gauge('os_counter_total', 'Times cron job ran', registry=registry)

    # Set the counter to the current value and increment
    REQUESTS.set(float(current_counter)+float(1))

    metrics_data = generate_latest(registry).decode('utf-8')

    # Write the updated metrics data to the file
    with open(METRICS_FILE, 'w') as f:
        f.write(metrics_data)

nmap = nmap3.Nmap()
results = nmap.nmap_os_detection("10.0.0.1-5")
with open("/var/log/nmap_os_results.json","a") as log:
    json.dump(results, log, indent=4)

increment_and_save_counter()



