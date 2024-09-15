import React from "react";

function ResultsCard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-lg font-bold mb-4">IP address: 192.168.17.130</h2>
      <h2 className="text-lg font-bold mb-4">OS version: linux</h2>
      <div className="mb-4">
        <label className="text-lg font-bold text-slate-900 dark:text-slate-800">
          Command:
        </label>
        <div className="flex mt-1">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-lg"
            placeholder="Enter command"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-lg">
            🔍
          </button>
        </div>
      </div>
      <div>
        <label className="text-lg font-bold text-slate-900 dark:text-slate-800">
          Result:
        </label>
        <div className="mt-1 p-2 border rounded-lg bg-gray-50 h-32">
          Executed command: whoami
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;
