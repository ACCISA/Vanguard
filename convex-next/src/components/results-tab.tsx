"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type ScanResult = {
  host: string;
  hostname: string;
  hostname_type: string;
  protocol: string;
  port: string;
  name: string;
  state: string;
  product: string;
  extrainfo: string;
  reason: string;
  version: string;
  conf: string;
  cpe: string;
};

export default function ResultsTab() {
  const [results, setResults] = useState([]);
  const hasFetched = useRef(false); // A ref to track if the API has been called

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!results.length && !hasFetched.current) {
          hasFetched.current = true;
          // post request to api/post-data
          const response1 = await fetch("/api/data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const res = await response1.json();
          setResults(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (results === undefined) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <Card className="bg-gray-800 border-yellow-500">
        <CardHeader>
          <CardTitle className="text-yellow-500">No Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white">
            No log entries found. Try adding some data.
          </p>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card className="bg-gray-800 border-green-500">
        <CardHeader>
          <CardTitle className="text-green-500">Scan Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="bg-white">
              <TableHeader>
                <TableRow>
                  <TableCell>Host</TableCell>
                  <TableCell>Hostname</TableCell>
                  <TableCell>Hostname Type</TableCell>
                  <TableCell>Protocol</TableCell>
                  <TableCell>Port</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Extra Info</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Version</TableCell>
                  <TableCell>Conf</TableCell>
                  <TableCell>CPE</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.length > 0 &&
                  results.map((result: ScanResult, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.host}</TableCell>
                      <TableCell>{result.hostname}</TableCell>
                      <TableCell>{result.hostname_type}</TableCell>
                      <TableCell>{result.protocol}</TableCell>
                      <TableCell>{result.port}</TableCell>
                      <TableCell>{result.name}</TableCell>
                      <TableCell>{result.state}</TableCell>
                      <TableCell>{result.product}</TableCell>
                      <TableCell>{result.extrainfo}</TableCell>
                      <TableCell>{result.reason}</TableCell>
                      <TableCell>{result.version}</TableCell>
                      <TableCell>{result.conf}</TableCell>
                      <TableCell>{result.cpe}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }
}
