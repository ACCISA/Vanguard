import React from 'react';
import { useState } from 'react';
import ProgressBar from './ProgressBar';
import axios from "axios";
import logo from '/public/logo.png';
import { 
  Card, CardBody, CardFooter, Stack, Heading, Button, Text, Input, Checkbox, Wrap, WrapItem 
} from '@chakra-ui/react';

function InputForm() {
  const [isClicked, setisClicked] = useState(false);
  const [ipRange, setIpRange] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const handleScan = (ev) => {
    ev.preventDefault();
    axios.post("/scan",{
      ip_range:ipRange 
    })
    .then((data) => {
      setIsScanning(true);
    })
    .catch((err) => {console.log(err)});    
  }
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      height="auto"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        spacing={4}
        width="100%"
        align="center"
        justify="center"
        padding={4}
      >
        <CardBody>
          <Heading size='md' className='text-center' >
            Scan
          </Heading>
          <p>Scan an IP address or range of IPs on a network to discover vulnerabilities and test them.</p>
          <br />
          <form className="max-w-sm" style={{ margin: '0 auto'}}>
            <div className='mb-5'>

              <label htmlFor="ip" className="block mb-2 text-sm font-medium text-slate-900 dark:text-slate-800">
                IP address (or range):
              </label>
              <Input
                type="text"
                id="ip"
                placeholder="XXX.XXX.X.X or XXX.XXX.X.X-XXX"
                required
                width="full"
                value={ipRange}
          	onChange={(ev) => setIpRange(ev.target.value)}      
	  // backgroundColor={'#192235'}
                className='dark:bg-slate-700 bg-white text-white'
              />
            </div>
            
            <div className='flex justify-center pb-2'>
              Additional options: 
            </div>
            {/* Wrap component for options with checkboxes, allowing for wrapping */}
            <Wrap spacing="20px" justify="center">
              {/* Wrap each checkbox in a WrapItem for proper spacing */}
              <WrapItem><Checkbox value="option1">-sV</Checkbox></WrapItem>
              <WrapItem><Checkbox value="option2">-sC</Checkbox></WrapItem>
              <WrapItem><Checkbox value="option3">-T4</Checkbox></WrapItem>
              <WrapItem><Checkbox value="option4">-O</Checkbox></WrapItem>
              <WrapItem><Checkbox value="option5">-Pn</Checkbox></WrapItem>
              <WrapItem><Checkbox value="option6">-oA</Checkbox></WrapItem>
              {/* Add more checkboxes as needed */}
            </Wrap>
          </form>
        </CardBody>
        <CardFooter>
        <Button
        variant='solid'
        size='s'
        height={50}
        width={150}
        borderWidth={2}
        borderColor={'grey'}
        backgroundSize="cover" // Ensure the image covers the entire button
        backgroundPosition="center" // Center the image on the button
        textColor={'white'}
        backgroundColor={'#192235'} // You might want to set a text color that contrasts well with your image
        _hover={{
          opacity: 0.85 // Optional: style for hover state
        }}
        onClick={handleScan}
      >Submit
      </Button>

        </CardFooter>
        { isClicked && <>
          <div>
            <span className='font-medium text-md'>Running the following command:</span> <span className='text-md italic'>nmap -O -sV -T4 192.168.0.1/24</span>
          </div>
          <ProgressBar/>
          </>
        }
        
      </Stack>
    </Card>
  )
}

export default InputForm;
