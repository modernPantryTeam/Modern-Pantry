import * as React from 'react'
import { AppBar, Toolbar, Grid } from '@mui/material'
import ButtonCustom from './ButtonCustom'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

function Headbar() {
    return (
        <AppBar>
            <Toolbar style={{backgroundColor: "#ffffff",}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                >
                    <a href="/">
                    <input type="image" alt="pantry logo" src=" https://i.imgur.com/LXfHfIz.png"></input>
                    </a>
                    <ButtonCustom link="/" name={"Modern Pantry"} />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                >
                    <ButtonCustom link="/login" name="Login" icon={<LoginOutlinedIcon />} />
                    <ButtonCustom link="/sign-up" name="Sign Up" icon={<LockOpenOutlinedIcon />} />
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
export default Headbar;