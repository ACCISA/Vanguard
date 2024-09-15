import nmap3
import json
from prometheus_client import CollectorRegistry, Counter, Gauge, generate_latest
import re
import os

from ingest import append_json
from prometheus import increment_counter


METRICS_FILE = '/var/log/prom/network_counter.prom'

nmap = nmap3.Nmap()
results = nmap3.NmapScanTechniques().nmap_ping_scan("10.0.0.1-5")
increment_counter('network_counter_total',METRICS_FILE)

append_json("/var/log/json/nmap_network.json", results)



