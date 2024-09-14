import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import InputForm from '../components/InputForm';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ipRange, setIpRange] = useState("");
  const navigate = useNavigate();
  const handleScan = (ev) => {
    ev.preventDefault();
    axios.post("/scan",{
      ip_range:ipRange 
    })
    .then((data) => {
      
    })
    .catch((err) => {console.log(err)});    
  }

  const handleChaos = (ev) => {
    ev.preventDefault();
    axios.post("/scan",{
      ip_range: "192.168.17.130"
    })
    .then((data) => {
      
    })
    .catch((err) => {console.log(err)}); 
  }

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
          <InputForm />
            
          </div>
          


        </main>

      </div>
    </div>
  );
}

export default Dashboard;
