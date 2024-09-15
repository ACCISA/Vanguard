"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Terminal,
  Wifi,
  Activity,
  Lock,
  AlertTriangle,
  Key,
  Zap,
} from "lucide-react";
import ImageD from "@/app/image.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResultsTab from "./results-tab";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const CyberDashboard = () => {
  const [activeTab, setActiveTab] = useState("network");

  const tabs = [
    { id: "network", icon: Wifi, label: "Network" },
    { id: "vulnerabilities", icon: AlertTriangle, label: "Vulnerabilities" },
    { id: "incidents", icon: Activity, label: "Metrics" },
    { id: "results", icon: Terminal, label: "Nmap Scans" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "network":
        return <NetworkTab />;
      case "vulnerabilities":
        return <VulnerabilitiesTab />;
      case "incidents":
        return <IncidentsTab />;
      case "results":
        return <ResultsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-black text-green-500">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-4">
        <div className="flex items-center mb-8">
          <Image
            src={ImageD}
            alt="Vanguard"
            width={220}
            height={220}
            className="rounded-2xl"
          />
        </div>
        <nav>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={cn(
                "w-full justify-start mb-2",
                activeTab === tab.id
                  ? "bg-green-900 text-green-400"
                  : "text-gray-400 hover:text-green-400 hover:bg-gray-800"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </h2>
        </header>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

export default CyberDashboard;

function NetworkTab() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gray-200 border-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Active Connections
          </CardTitle>
          <Wifi className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,324</div>
          <p className="text-xs text-gray-600">+10.1% from last hour</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-200 border-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
          <Activity className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">789 GB</div>
          <p className="text-xs text-gray-600">+2.4% from yesterday</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-200 border-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Firewall Status</CardTitle>
          <Lock className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Active</div>
          <p className="text-xs text-gray-600">Last updated 5 mins ago</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-200 border-red-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Intrusion Attempts
          </CardTitle>
          <Shield className="w-4 h-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-gray-600">+8% from last 24 hours</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-200 border-yellow-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Encryption Strength
          </CardTitle>
          <Key className="w-4 h-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">256-bit AES</div>
          <p className="text-xs text-gray-600">
            Standard for secure communication
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gray-200 border-blue-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">DDoS Protection</CardTitle>
          <Zap className="w-4 h-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Active</div>
          <p className="text-xs text-gray-600">No recent attacks detected</p>
        </CardContent>
      </Card>
    </div>
  );
}

interface CrackAttempt {
  attempt_password: string;
  try_mic: string;
}

interface CrackResultProps {
  data: {
    mic: string;
    ssid: string;
    ap_mac_address: string;
    client_mac_address: string;
    ap_nonce: string;
    client_nonce: string;
    eapol_client: string;
    crack_attempts: CrackAttempt[];
    result: {
      status: string;
      cracked_password: string;
    };
  };
}

const VulnerabilitiesTab: React.FC = () => {
  const data: CrackResultProps["data"] = {
    mic: "9be65a7cfb05877db5401b14195414a0",
    ssid: "PixelVictim",
    ap_mac_address: "74:da:38:6b:98:dd",
    client_mac_address: "c8:21:58:bd:60:e1",
    ap_nonce:
      "b0f8abd79d6b5576a70eb8096c0edfe58521700b53419b901a2efd4d872de252",
    client_nonce:
      "dbf64148d9446f4d2437989ea0e4a17c141bcb0df18b04295dc73bccafb679ac",
    eapol_client:
      "0103007702010a00000000000000000001dbf64148d9446f4d2437989ea0e4a17c141bcb0df18b04295dc73bccafb679ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001830160100000fac040100000fac040100000fac023c000000",
    crack_attempts: [
      { attempt_password: "1", try_mic: "54eaa070158e11abed9294abde7e4507" },
      { attempt_password: "2", try_mic: "fb73614db81821b2920532c9237d4f37" },
      { attempt_password: "3", try_mic: "5cf7a70430157b09252e14bc1c1cc82e" },
      { attempt_password: "4", try_mic: "b551b2b5ffc334f799bfb162f42490fc" },
      { attempt_password: "5", try_mic: "d0211f30fcb63d6abbff031a19e11720" },
      { attempt_password: "6", try_mic: "51c130043245e4016e3da00c21698b32" },
      { attempt_password: "7", try_mic: "31f08fc35017da5e8b867bb17c206bf9" },
      { attempt_password: "8", try_mic: "960ddda1fe26e0d005c0ae61c0c68229" },
      { attempt_password: "9", try_mic: "193b2c9c470a5ea2744a6233e5334fb5" },
      { attempt_password: "1", try_mic: "54eaa070158e11abed9294abde7e4507" },
      { attempt_password: "2", try_mic: "fb73614db81821b2920532c9237d4f37" },
      {
        attempt_password: "1234567",
        try_mic: "286917792ed28427f69a42c4bd94e944",
      },
      {
        attempt_password: "0987654321",
        try_mic: "cde2c77715506e0310d338bdb41536f1",
      },
      {
        attempt_password: "1234567890",
        try_mic: "b1a1f2ddb2db7153b26082adbc26f176",
      },
      {
        attempt_password: "12345678",
        try_mic: "9be65a7cfb05877db5401b14195414a0",
      },
    ],
    result: {
      status: "success",
      cracked_password: "12345678",
    },
  };

  const [attempts, setAttempts] = useState<CrackAttempt[]>([]);
  const [finalPassword, setFinalPassword] = useState<string | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const delay = 1000; // 1 second delay between attempts
    const displayAttempts = async () => {
      for (let i = 0; i < data.crack_attempts.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        // Prepend new attempt to the start of the list
        const attempts = data.crack_attempts.slice(0, i).reverse();
        setAttempts(attempts);

        if (i === data.crack_attempts.length - 1) {
          // Show the final password after the last attempt
          setTimeout(() => {
            setFinalPassword(data.result.cracked_password);
            controls.start({ opacity: 1 });
          }, delay);
        }
      }
    };

    displayAttempts();
  }, []);

  const micData = {
    mic: "9be65a7cfb05877db5401b14195414a0",
    ssid: "PixelVictim",
    ap_mac_address: "74:da:38:6b:98:dd",
    client_mac_address: "c8:21:58:bd:60:e1",
    ap_nonce:
      "b0f8abd79d6b5576a70eb8096c0edfe58521700b53419b901a2efd4d872de252",
    client_nonce:
      "dbf64148d9446f4d2437989ea0e4a17c141bcb0df18b04295dc73bccafb679ac",
    eapol_client:
      "0103007702010a00000000000000000001dbf64148d9446f4d2437989ea0e4a17c141bcb0df18b04295dc73bccafb679ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001830160100000fac040100000fac040100000fac023c000000",
  };
  return (
    <div className="container mx-auto p-4">
      {/* Table Display */}
      {/* Table with horizontal scroll if too wide */}
      <div className="mb-4 overflow-x-auto">
        <h2 className="text-lg font-semibold">Network Data:</h2>
        <table className="table-auto border-collapse border border-gray-400 w-full mb-4">
          <thead>
            <tr>
              <th className="border border-gray-400 p-2">Field</th>
              <th className="border border-gray-400 p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(micData).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-400 p-2 font-semibold">
                  {key}
                </td>
                <td className="border border-gray-400 p-2 truncate max-w-xs">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <motion.div
        animate={controls}
        initial={{ opacity: 0 }}
        className="text-2xl font-bold mt-4"
      >
        {finalPassword ? (
          <div>
            <h2 className="text-lg font-semibold">Cracked Password:</h2>
            <p className="mb-8">{finalPassword}</p>
          </div>
        ) : (
          <p>Revealing final password...</p>
        )}
      </motion.div>

      <div>
        <h2 className="text-lg font-semibold">Attempts:</h2>
        <ul>
          {attempts.map((attempt, index) => (
            <li key={index} className="mb-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-2 border rounded"
              >
                Attempt: {attempt.attempt_password} - MIC: {attempt.try_mic}
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function IncidentsTab() {
  return (
    <div style={{ height: "100%" }}>
      <iframe
        src="http://192.168.157.53:3000/d/rYdddlPWk/node-exporter-full?orgId=1&from=1726367198835&to=1726395782089&kiosk"
        width="100%"
        height="700"
      ></iframe>
    </div>
  );
}
