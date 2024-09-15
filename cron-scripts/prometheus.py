import json
from prometheus_client import CollectorRegistry, Counter, Gauge, generate_latest
import re
import os

def parse_metrics_file(name, METRICS_FILE):
    if not os.path.exists(METRICS_FILE):
        return 0.0  # Default values if file does not exist

    with open(METRICS_FILE, 'r') as f:
        content = f.read()
    
    counter_match = re.search(r'^'+str(name)+'\s+(\d+\.?\d*)$', content, re.MULTILINE)

    current_counter = float(counter_match.group(1)) if counter_match else 0.0

    return current_counter

def increment_counter(name, METRICS_FILE):
    current_counter = parse_metrics_file(name, METRICS_FILE)

    registry = CollectorRegistry()
    REQUESTS = Gauge(name, 'Times cron job ran', registry=registry)

    REQUESTS.set(float(current_counter)+float(1))

    metrics_data = generate_latest(registry).decode('utf-8')

    with open(METRICS_FILE, 'w') as f:
        f.write(metrics_data)
