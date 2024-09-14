import nmap

nm = nmap.PortScanner()
nm.scan("localhost","10-802")

log_file = "/var/log/nmap_results.log"

f = open(log_file, "a")

f.write("------------------------------------")
f.write("")
f.write((nm.csv()))
f.write("")
f.write("------------------------------------")
f.write("")

f.close()

