import React, { Component } from 'react'
import Drawer from '../components/Drawer'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Transitions from '../components/Transition';
import authService from '../services/auth-service';
import userService from '../services/user-service';

export default class User extends Component {

    constructor(props) {
        super(props);

        this.popup = this.popup.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            open: false,
            currentUser: authService.getCurrentUser(),
            username: "",
            email: "",
            password: "",
            message: "",
            updated: false
        };
    }

    popup(e) {
        e.preventDefault();
        e.target.reset()
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            open: true
        });
    }

    componentDidMount() {

        this.setState({
            username: this.state.currentUser.content.user.username,
            email: this.state.currentUser.content.user.email,
            password: this.state.currentUser.password
        });

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleUpdate(e) {
        e.preventDefault();
        userService.update(
            this.state.username,
            this.state.email,
            this.state.password,
        ).then(
            response => {
                this.setState({
                    message: response.data.message
                });
                userService.login().then(
                    () => {
                        this.setState({
                            updated: true
                        });
                    },
                );
            },
        );
    }

    render() {
        if (!this.state.open) {
            return (
                <><Drawer />
                    <Transitions>
                        <div className="centerd1 sm:w-3/5 sm:mx-auto md:w-3/5 md:mx-auto lg:w-2/5 lg:mx-auto ds rounded">
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '8rem' }}
                                    image="https://i.imgur.com/poFWJfz.png"
                                    alt="avatar"
                                    style={{ margin: '15px' }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography style={{ margin: '20px', paddingLeft: '5px' }} component="div" variant="h5">
                                        {this.state.username}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 5 }}>
                                        <button 
                                            type="button"
                                            disabled={this.state.loading}
                                            className={`mr-6 text-white w-40 rounded h-8 font-bold border`}
                                            onClick={this.handleClick}
                                        >
                                            Edit profile
                                        </button>
                                    </Box>
                                </Box>
                            </Card>
                        </div>
                    </Transitions>
                </>
            );
        } else {
            return (
                <>
                    <Drawer></Drawer>
                    <Transitions>
                        <div className='centerd sm:w-3/5 sm:mx-auto md:w-3/5 md:mx-auto lg:w-3/5 lg:mx-auto ds rounded'>
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography style={{ margin: '20px', paddingLeft: '5px' }} component="div" variant="h5">
                                            Edit your profile
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, pb: 5, pr: 5, pt: 0 }}>
                                        <form onSubmit={this.handleUpdate}>

                                            <input
                                                type="text"
                                                onChange={this.onChangeUsername}
                                                value={this.state.username}
                                                placeholder="Username"
                                                className="text-sm darkthemebg text-white w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                                name="username"
                                                required
                                            />

                                            <input
                                                type="text"
                                                onChange={this.onChangeEmail}
                                                value={this.state.email}
                                                placeholder="Email"
                                                className="text-sm darkthemebg text-white w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                                name="email"
                                                required
                                            />

                                            <input
                                                type="password"
                                                onChange={this.onChangePassword}
                                                value={this.state.password}
                                                placeholder="Password"
                                                className="text-sm darkthemebg text-white w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                                name="password"
                                                required
                                            />

                                            <button
                                                type="submit"
                                                className={`mt-2 text-white w-40 rounded h-8 font-bold border margin`}
                                            >
                                                Confirm
                                            </button>

                                        </form>
                                    </Box>
                                </Box>
                            </Card>
                        </div>
                    </Transitions>
                </>
            );
        }
    }
}