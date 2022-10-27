import { AppBar, Toolbar, Grid, Button } from '@mui/material'
import ButtonCustom from '../components/ButtonCustom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import authService from '../services/auth-service';
import userService from '../services/user-service';
import lang from 'i18next'
import React, { Component } from 'react';



export default class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        authService.logout();
        userService.logout();
        window.location.reload();
    }

    render() {

        return (
            <AppBar position="sticky" elevation={5}>
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                    >
                        <a href="/">
                            <input type="image" alt="pantry logo" src="https://i.imgur.com/ZTcHjwn.png" style={{ height: '38px', justifyContent: 'flex-start', marginLeft: '0px', direction: 'row', marginTop: '5px' }} />
                        </a>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <ButtonCustom link="/" name={lang.t('home')} icon={<HomeOutlinedIcon />} />
                        <ButtonCustom link="/add" name={lang.t('add')} icon={<AddBoxOutlinedIcon />} />
                        <ButtonCustom link="/profile" name={lang.t('profile')} icon={<AccountBoxOutlinedIcon />} />
                        <Button
                            onClick={this.handleLogout}
                            style={{ color: 'black', marginLeft: '0px' }}
                            variant="text"
                            startIcon={<LogoutOutlinedIcon />} >
                            {lang.t('logout')}
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}