import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ProgressBar from '../components/ProgressBar';
import NetworkCard from '../components/NetworkCard';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const Network = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [machines, setMachines] = useState([]);
    const navigate = useNavigate();  
  
    const handleScanRedirect = () => {
      navigate("/scan");
    }

    useEffect(() => {
      console.log("calling /machines")
      axios.get("/machines")
      .then((res) => {
        console.log(res.data.machines)
        setMachines(res.data.machines)
      })
      console.log("Called")
    }, []);
    
    useEffect(() => {},[machines])
    
    console.log(machines)
    const renderMachines = machines.map((row, rowIndex) => (
      <NetworkCard ipAddress={row[0]} osVersion={"linux"}  macAddress={"00-B0-D0-63-C2-26"} data={row}></NetworkCard>
    ))

  return ( 
  <div className="flex h-screen overflow-hidden">

  {/* Sidebar */}
  <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

  {/* Content area */}
  <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

    {/*  Site header */}
    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    <main>
      <div className="bg-[#182235] w-full flex flex-row items-center justify-between">
        <p className='p-4 mr-10'>
          It seems like your network map is empty. Start a scan to discover open ports.
        </p>
        <div className='flex flex-row items-center gap-8'>
          <button className='bg-slate-500 p-2 rounded-md' onClick={handleScanRedirect}>
            Start Scan
          </button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        </div>
        

      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <h1 className='flex justify-center text-2xl text-slate-800 dark:text-slate-300 font-bold pb-5'>Network Summary</h1>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-6'>
          
          <NetworkCard ipAddress={"192.168.0.1"} osVersion={"windows"} macAddress={"2132131"} ports={[{21:"vsftpd 2.3.4"}, {22:"OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)"},{21:"vsftpd 2.3.4"}, {21:"vsftpd 2.3.4"}, {21:"vsftpd 2.3.4"} ]}  />
          {machines.length != 0 && renderMachines}
        
        </div>
        {/* <ProgressBar/> */}
      </div>

    </main>


  </div>
</div>
  )
}
