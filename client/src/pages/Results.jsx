import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import InputForm from "../components/InputForm";

function Results() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hardcoded data based on the provided log info
  const results = [
    {
      host: "127.0.0.1",
      hostname: "localhost",
      hostname_type: "user",
      protocol: "tcp",
      port: "22",
      name: "ssh",
      state: "open",
      product: "OpenSSH",
      extrainfo: "Ubuntu Linux; protocol 2.0",
      reason: "syn-ack",
      version: "8.9p1 Ubuntu 3ubuntu0.10",
      conf: "10",
      cpe: "cpe:/o:linux:linux_kernel",
    },
    {
      host: "127.0.0.1",
      hostname: "localhost",
      hostname_type: "PTR",
      protocol: "tcp",
      port: "22",
      name: "ssh",
      state: "open",
      product: "OpenSSH",
      extrainfo: "Ubuntu Linux; protocol 2.0",
      reason: "syn-ack",
      version: "8.9p1 Ubuntu 3ubuntu0.10",
      conf: "10",
      cpe: "cpe:/o:linux:linux_kernel",
    },
    {
      host: "127.0.0.1",
      hostname: "localhost",
      hostname_type: "user",
      protocol: "tcp",
      port: "22",
      name: "ssh",
      state: "open",
      product: "OpenSSH",
      extrainfo: "Ubuntu Linux; protocol 2.0",
      reason: "syn-ack",
      version: "8.9p1 Ubuntu 3ubuntu0.10",
      conf: "10",
      cpe: "cpe:/o:linux:linux_kernel",
    },
    {
      host: "127.0.0.1",
      hostname: "localhost",
      hostname_type: "PTR",
      protocol: "tcp",
      port: "22",
      name: "ssh",
      state: "open",
      product: "OpenSSH",
      extrainfo: "Ubuntu Linux; protocol 2.0",
      reason: "syn-ack",
      version: "8.9p1 Ubuntu 3ubuntu0.10",
      conf: "10",
      cpe: "cpe:/o:linux:linux_kernel",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Results Table */}
            <div className="mt-8">
              {results.length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Host
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Hostname
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Hostname Type
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Protocol
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Port
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        State
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Product
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Extra Info
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Reason
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Version
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        Confidence
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-left">
                        CPE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                          {result.host}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.hostname}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.hostname_type}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.protocol}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.port}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.state}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.product}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.extrainfo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.reason}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.version}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.conf}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {result.cpe}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Results;
