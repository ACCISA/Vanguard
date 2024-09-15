import nmap3
import json

from prometheus_client import CollectorRegistry, Counter, Gauge, generate_latest
import re
import os

from prometheus import increment_counter
from ingest import append_json

METRICS_FILE = '/var/log/prom/os_counter.prom'



nmap = nmap3.Nmap()
results = nmap.nmap_os_detection("10.0.0.1-5")

increment_counter("os_counter_total", METRICS_FILE)

print(results)

append_json("/var/log/json/nmap_os_results.json",results)
