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
  const data = useQuery(api.nmapLogs.getAllNmapLogs);
  console.log(data);
  const results = data?.map((entry) => ({
    host: entry.host,
    hostname: entry.hostname,
    hostname_type: entry.hostname_type,
    protocol: entry.protocol,
    port: entry.port,
    name: entry.name,
    state: entry.state,
    product: entry.product,
    extrainfo: entry.extrainfo,
    reason: entry.reason,
    version: entry.version,
    conf: entry.conf,
    cpe: entry.cpe,
  }));

  if (results === undefined) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (results.length === 0) {
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
  }

  return (
    <Card className="bg-gray-800 border-green-500">
      <CardHeader>
        <CardTitle className="text-green-500">Scan Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(results[0]).map((key) => (
                  <TableHead key={key} className="text-green-400">
                    {key}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index} className="border-b border-gray-700">
                  {Object.values(result).map((value, valueIndex) => (
                    <TableCell key={valueIndex}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
