"use client";

import { useState } from "react";
import {
  Shield,
  Terminal,
  Wifi,
  Activity,
  Lock,
  AlertTriangle,
} from "lucide-react";
import ImageD from "@/app/image.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResultsTab from "./results-tab";

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
          <Image src={ImageD} alt="Vanguard" width={220} height={220} />
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
      <Card className="bg-gray-800 border-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Active Connections
          </CardTitle>
          <Wifi className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,324</div>
          <p className="text-xs text-gray-400">+10.1% from last hour</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
          <Activity className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">789 GB</div>
          <p className="text-xs text-gray-400">+2.4% from yesterday</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-green-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Firewall Status</CardTitle>
          <Lock className="w-4 h-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Active</div>
          <p className="text-xs text-gray-400">Last updated 5 mins ago</p>
        </CardContent>
      </Card>
    </div>
  );
}

function VulnerabilitiesTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-yellow-500">
        <CardHeader>
          <CardTitle className="text-yellow-500">
            Critical Vulnerabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>SQL Injection in login form</li>
            <li>Outdated SSL certificate on main server</li>
            <li>Unpatched remote code execution in CMS</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-orange-500">
        <CardHeader>
          <CardTitle className="text-orange-500">
            High Vulnerabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cross-site scripting in comment system</li>
            <li>Weak password policy for admin accounts</li>
            <li>Insecure direct object references in API</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function IncidentsTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-red-500">
        <CardHeader>
          <CardTitle className="text-red-500">Recent Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Brute force attack attempt</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Suspicious file upload detected</span>
              <span className="text-xs text-gray-400">5 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Unauthorized access to admin panel</span>
              <span className="text-xs text-gray-400">1 day ago</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="bg-gray-800 border-green-500">
        <CardHeader>
          <CardTitle className="text-green-500">Incident Response</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              Current Status:{" "}
              <span className="font-bold text-yellow-500">Investigating</span>
            </p>
            <p>
              Team on call: <span className="font-bold">Alpha Team</span>
            </p>
            <p>Next steps: Isolate affected systems and analyze logs</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
