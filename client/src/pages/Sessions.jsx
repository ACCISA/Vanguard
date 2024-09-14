import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SessionsCard from '../components/SessionsCard';

function Sessions() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
      <h1 className='flex justify-center text-2xl text-slate-800 dark:text-slate-300 font-bold pb-5'>Sessions</h1>
        <div className='grid lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-6'>
          
            <SessionsCard />

         
        </div>
        {/* <ProgressBar/> */}
      </div>

    </main>


  </div>
</div>
  )
}

export default Sessions