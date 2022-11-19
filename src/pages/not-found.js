import { useEffect } from 'react';
import { Card, CardHeader, CardContent, Typography, Grid } from '@mui/material'
import ButtonCustom from '../components/ButtonCustom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Transitions from '../components/Transition'

export default function NotFound() {

  return (

    <Transitions>
      <div className="flex mx-auto items-center h-screen">
        <div className="flex w-full">
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-center items-center flex-col w-full rounded text-white">
            <p className="text-main-main text-black">
              Not Found!
            </p>
            <p className="text-small text-black">
              You happened to get lost in our mysterious pantry.
              Pressing home button will take you back to civilization.
            </p>
            <div className="flex justify-center items-center flex-col w-2/5 bg-white p-2 rounded border border-gray-primary">
              <ButtonCustom link="/" name="Home" color="white" icon={<HomeOutlinedIcon />} />
            </div>
          </div>
        </div>
      </div>
    </Transitions>

  );
}