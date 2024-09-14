import nmap

nm = nmap.PortScanner()
nm.scan("localhost", "22,8081")

log_file = "/var/log/nmap_results.log"

f = open(log_file, "a")
print("Scan Results")
print(nm.csv())
f.write("------------------------------------\n")
f.write((nm.csv()))

f.close()

