"use client";
import CyberDashboard from "@/components/cyber-dashboard";
import { promises as fs } from "fs";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [data, setData] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data"); // Call the API route
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, []);
  return <CyberDashboard />;
};

export default DashboardPage;
