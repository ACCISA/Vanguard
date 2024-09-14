import nmap
import logging
from console import Console
from database import ExploitDB
console = Console()


logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s [%(asctime)s] %(filename)s:%(lineno)d - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

class Port:
    def __init__(self, port, service, version):
        self.port = port
        self.service = service
        self.version = version

class Machine:
    def __init__(self, ip):
        # self.os = os
        self.ip = ip
        self.ports = []
        # self.mac_address = None
        # self.last_update = None
        # self.vulnerabilities = []

    # def runVulnScan(self):
    # run the vulnerability scan

    def exploitPort(self, port):
        # run the exploit on the port
        console
        pass

    def scan(self, flags):

        logging.debug("scanning ip: "+str(self.ip)+" "+str(flags))
        logging.debug("running scan on: "+str(self.ip))

        nm = nmap.PortScanner()
        flags += " -p 80,5432,21,22"
        nm.scan(hosts=self.ip, arguments=flags)
        logging.debug("scan complete for :"+str(self.ip))
        logging.debug(nm.all_hosts())
        ports = []

        for host in nm.all_hosts():
            for port, info in nm[host]['tcp'].items():
                service = info.get('name', 'Unknown')
                version = info.get('version', 'Unknown')
                ports.append(Port(port, service, version))

        # need to parse the data from the nmap scan
        return ports

    def setName(self, name):
        self.name = name

    def getName(self):
        return self.name

    def getIp(self):
        return self.ip

    def getPort(self):
        return self.port

    def getStatus(self):
        return self.status
