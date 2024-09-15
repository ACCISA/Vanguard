import sqlite3
import csv
import json
import re

from prometheus import increment_counter
from ingest import get_time

# Create a simple SQL database with entries holding strings to vulnerable versions
def create_database():
    conn = sqlite3.connect('vulnerabilities.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS vulnerabilities (id INTEGER PRIMARY KEY, product TEXT, version_pattern TEXT)''')
    c.execute("INSERT INTO vulnerabilities (product, version_pattern) VALUES ('vsftpd', '2.3.4')")
    c.execute("INSERT INTO vulnerabilities (product, version_pattern) VALUES ('Samba', '3')")
    c.execute("INSERT INTO vulnerabilities (product, version_pattern) VALUES ('Postfix smtpd', '0')")
    conn.commit()
    conn.close()

# Check if vulnerabilities exist in the CSV
def check_vulnerabilities(csv_file):
    conn = sqlite3.connect('vulnerabilities.db')
    c = conn.cursor()
    
    vulnerabilities = []
    for row in c.execute("SELECT product, version_pattern FROM vulnerabilities"):
        vulnerabilities.append((row[0], row[1]))
    
    results = []
    seen_hosts = set()
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file, delimiter=';')
        print("CSV file has been read successfully.")  # Confirmation print statement
        for row in reader:
            for product, version_pattern in vulnerabilities:
                host_product_key = (row['host'], product)
                if product in row['product'] and re.search(version_pattern, row['version']) and host_product_key not in seen_hosts:
                    increment_counter("exploit_counter_total", "/var/log/prom/exploit_counter.prom")
                    results.append({
                        "exploit": {
                            'host': row['host'],
                            'protocol': row['protocol'],
                            'port': row['port'],
                            'name': row['name'],
                            'state': row['state'],
                            'product': row['product'],
                            'extrainfo': row['extrainfo'],
                            'version': row['version']
                        },
                        "time": get_time()
                    })
                    seen_hosts.add(host_product_key)
    
    return results

# Create the database
create_database()

# Check the CSV file for vulnerabilities and output the result in JSON format
csv_file = '/var/log/json/nmap_ports.csv'
vulnerability_results = check_vulnerabilities(csv_file)

# Export the result to a JSON file
json_output_file = '/var/log/json/vulnerability_results.json'
with open(json_output_file, 'w') as json_file:
    json.dump(vulnerability_results, json_file, indent=4)

print(f"Vulnerability results have been written to {json_output_file}")

