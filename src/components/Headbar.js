import * as React from 'react'
import { AppBar, Toolbar, Grid, Typography } from '@mui/material'
import ButtonCustom from './ButtonCustom'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';

function Headbar({}) {
    return (
<AppBar>
<Toolbar>
    <Grid
        container
        direction="row"
        justifyContent="flex-start"
    >
    <ButtonCustom link="/" name={"Modern Pantry"} />
    </Grid>
    <Grid
        container
        direction="row"
        justifyContent="flex-end"
    >
        <ButtonCustom link="/login" icon={<LoginOutlinedIcon />} />
        <ButtonCustom link="/sign-up" icon={<LockOpenOutlinedIcon />} />
        <ButtonCustom link="/contact-us" icon={<ContactMailOutlinedIcon />} />
    </Grid>
</Toolbar>
</AppBar>
);
}
export default Headbar;