from pymetasploit3.msfrpc import MsfRpcClient

client = MsfRpcClient('yourpassword', ssl=True)

print(client.sessions.list)