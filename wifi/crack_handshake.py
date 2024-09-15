import hashlib
import hmac
import sys
import struct
import json

# Default Values
hashline = None
passlist_src = "passlist.txt"

# Pull values from hashline if given (hc22000)
if len(sys.argv) > 1: 
    hashline = sys.argv[1]
    hl = hashline.split("*")
    mic = bytes.fromhex(hl[2])
    mac_ap = bytes.fromhex(hl[3])
    mac_cl = bytes.fromhex(hl[4])
    essid = bytes.fromhex(hl[5])
    nonce_ap = bytes.fromhex(hl[6])
    nonce_cl = bytes.fromhex(hl[7][34:98])           # Client Nonce is part of EAPoL Client
    eapol_client = bytes.fromhex(hl[7])
if len(sys.argv) > 2: 
    passlist_src = sys.argv[2]

# Read passlist.txt into a python list
with open(passlist_src, 'r') as f:
    passlist = f.read().splitlines()

def crack_handshake(mic, mac_ap, mac_cl, essid, nonce_ap, nonce_cl, eapol_client):
    output_data = {
        "mic": mic.hex(),
        "ssid": essid.decode(),
        "ap_mac_address": ":".join(f"{b:02x}" for b in mac_ap),
        "client_mac_address": ":".join(f"{b:02x}" for b in mac_cl),
        "ap_nonce": nonce_ap.hex(),
        "client_nonce": nonce_cl.hex(),
        "eapol_client": eapol_client.hex(),
        "crack_attempts": [],
        "result": None
    }

    # Print initial settings in JSON format
    print(json.dumps({
        "message": "Initial settings",
        "settings": output_data
    }, indent=4))


    print('\033[1m' + '\33[33m' + "Attempting to crack password...\n" + '\x1b[0m')

    # Set order of byte strings (min, max)
    def min_max(a, b):
        if len(a) != len(b): raise ValueError('Unequal byte string lengths') 
        for entry in zip(list(bytes(a)), list(bytes(b))):
            if entry[0] < entry[1]: return (a, b)
            elif entry[1] < entry[0]: return (b, a)
        return (a, b)

    macs = min_max(mac_ap, mac_cl)
    nonces = min_max(nonce_ap, nonce_cl)
    ptk_inputs = b''.join([b'Pairwise key expansion\x00', 
                        macs[0], macs[1], nonces[0], nonces[1], b'\x00'])

    for password in passlist:
        password = password.encode()
        pmk = hashlib.pbkdf2_hmac('sha1', password, essid, 4096, 32)
        ptk = hmac.new(pmk, ptk_inputs, hashlib.sha1).digest()
        try_mic = hmac.new(ptk[:16], eapol_client, hashlib.sha1).digest()[:16]

        # Capture the attempt results
        attempt_data = {
            "attempt_password": password.decode(),
            "try_mic": try_mic.hex()
        }
        output_data["crack_attempts"].append(attempt_data)

        if try_mic == mic:
            output_data["result"] = {
                "status": "success",
                "cracked_password": password.decode()
            }
            print(json.dumps(output_data, indent=4))
            return

    output_data["result"] = {
        "status": "failure",
        "message": "Failed to crack password. It may help to try a different password list."
    }
    print(json.dumps(output_data, indent=4))

if len(sys.argv) > 1: 
    crack_handshake(mic, mac_ap, mac_cl, essid, nonce_ap, nonce_cl, eapol_client)

