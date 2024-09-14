import React, { useState } from 'react';
import axios from "axios";

function SessionsCard() {
  const [command, setCommand] = useState('');
  const [result, setResult] = useState('');
  const [ipAddress, setIpAddress] = useState("");
  const [os, setOs] = useState("linux");

  const handleCommandChange = (event) => {
    setCommand(event.target.value);
    // Send command to the session running in metasploit
  };

  const executeCommand = () => {
    axios.post("/interact", {
      
    })
    setResult(`Executed command: ${command}`);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">IP address: {ipAddress}</h2>
      <h2 className="text-lg font-bold mb-4">OS version: {os}</h2>
      <div className="mb-4">
        <label className="text-lg font-bold text-slate-900 dark:text-slate-800">Command:</label>
        <div className="flex mt-1">
          <input
            type="text"
            value={command}
            onChange={handleCommandChange}
            className="flex-grow p-2 border rounded-l-lg"
            placeholder="Enter command"
          />
          <button
            onClick={executeCommand}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-lg"
          >
            🔍
          </button>
        </div>
      </div>
      <div>
        <label className="text-lg font-bold text-slate-900 dark:text-slate-800">Result:</label>
        <div className="mt-1 p-2 border rounded-lg bg-gray-50 h-32">
          {result}
        </div>
      </div>
    </div>
  );
}

export default SessionsCard;
