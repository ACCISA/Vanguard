import logging
from machine import Machine
from database import ExploitDB

logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s [%(asctime)s] %(filename)s:%(lineno)d - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

exploits = ExploitDB()

data = [
    ("2.3.4", "exploit/unix/ftp/vsftpd_234_backdoor", ""),
    ("8.3.0 - 8.3.7", "exploit/linux/postgres/postgres_payload", "LHOST"),
]

exploits.add_entry(data)

exploits.retrieve_data("8.3.0 - 8.3.7")

class Network:
    # has a propery of machine objects in a list
    # has a property of the ip range (start and end)

    def __init__(self, ip_range):
        self.ip_range = ip_range
        self.machines = []
        self.vulnerable_ports = {}

    async def runInitialNetworkScan(self):
        logging.debug("running initial network scan")
        nums = self.ip_range.split(".")
        ip_start = ".".join(nums[0:3])
        start = None
        end = None
        if len(nums) != 4:
            return
        if "-" in nums[3]:
            nums2 = nums[3].split("-")
            start = nums2[0]
            end = nums2[1]
            logging.debug("scanning range from "+str(start)+" to "+str(end))
        else:
            
            logging.debug("running scan on 1 ip")
            machine = Machine(self.ip_range)#in this case the range is just an ip
            ports = machine.scan("-sV")
            logging.debug("ports on "+str(self.ip_range))
            logging.debug(ports)
            for port in ports:
                result = exploits.retrieve_data(port.version)
                logging.debug(result)
                if result[0]:
                    result[1][0] = list(result[1][0])
                    result[1][0].insert(0,machine.ip)
                    result[1][0][1] = port.port#overwrite the id

                    logging.warning("result: "+str(result[1]))
                    logging.warning("vulnerable port: "+str(port.port))
                    logging.warning(result[1])
                    self.vulnerable_ports[port.port] = result[1]
                    self.machines.append(result[1][0])
            print(self.machines)
            return
        
        for i in range(int(start), int(end)):
            machine = Machine(ip_start+"."+str(i))
            ports = machine.scan("-sV")
            for port in ports:
                result = exploits.retrieve_data(port.service)
                if result[0]:
                    result[1][0] = list(result[1][0])
                    result[1][0].insert(0,machine.ip)
                    result[1][0][1] = port.port#overwrite the id
                    logging.warning("vulnerable port: "+str(port.port))
                    logging.warning(result[1])
                    self.vulnerable_ports[port.port] = result[1]
                    self.machines.append(result[1][0])

            logging.debug("scan: "+str(ports))

    def getMachines(self):
        return self.machines
