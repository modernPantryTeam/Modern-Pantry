import * as React from 'react'
import { Button } from '@mui/material'

function WButtonCustom({ link, name, icon }) {
    return (
        <Button href={link} style={{ color: 'white', marginLeft: '0px' }} variant="text" startIcon={icon} >
            {name}
        </Button>
    );
}
export default WButtonCustom;