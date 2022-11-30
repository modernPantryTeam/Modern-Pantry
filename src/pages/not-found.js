import { useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material'
import WButtonCustom from '../components/WButtonCustom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Transitions from '../components/Transition'

export default function NotFound() {

  return (

    <Transitions>
    <div className="container flex mx-auto items-center h-screen">
      <div className="sm:w-20 md:w-20 lg:w-full">
      </div>
      <div className="flex flex-col w-4\/5 ">
        <div className="flex flex-col items-center darkthemebg p-4 lg:p-2 mb-4 rounded homeborder">
          <div className="flex flex-col w-full">
          <div className="flex justify-center items-center flex-col w-full rounded text-white">
          <Typography variant="h3" component="div">
              Not Found!
            </Typography>
            <div className= "text-center">
            <Typography variant="body2" color="text.secondary">
              You happened to get lost in our mysterious pantry.
              Pressing home button will take you back to civilization.
            </Typography>
            </div>
            <div className="flex justify-center items-center w-30 pt-2 rounded">
              <WButtonCustom link="/" name="Home" color="white" icon={<HomeOutlinedIcon />} />
            </div>
          </div>
        </div>
        </div>
  
      </div>
    </div>
  </Transitions>

  );
}