import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import { ChakraProvider } from '@chakra-ui/react'
// Import pages
import Dashboard from './pages/Dashboard';
import { Network } from './pages/Network';
import Front from './pages/Front';
import Sessions from './pages/Sessions';
import axios from 'axios';

function App() {

  const location = useLocation();
  
  axios.defaults.baseURL = "http://localhost:4000";

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <ChakraProvider>
    <>
      <Routes>
        <Route exact path="/" element={<Front />} />
        <Route exact path="/scan" element={<Dashboard />} />
        <Route exact path="/network" element={<Network />} />
        <Route exact path="/sessions" element={<Sessions />} />
        
      </Routes>
    </>
    </ChakraProvider>
  );
}

export default App;
