import * as React from 'react'
import { Button } from '@mui/material'

function ButtonCustom({ link, name, icon }) {
    return (
        <Button href={link} style={{ color: 'black', marginLeft: '0px' }} variant="text" startIcon={icon} >
            {name}
        </Button>
    );
}
export default ButtonCustom;