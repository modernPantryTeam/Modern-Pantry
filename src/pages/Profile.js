import React, { Component } from 'react'
import Drawer from '../components/Drawer'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Transitions from '../components/Transition'

export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.popup = this.popup.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            send: false
        };
    }

    popup(e) {
        e.preventDefault();
        e.target.reset()
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            send: true
        });
    }

    render() {
        if (!this.state.send) {
            return (
                <><Drawer />
                    <Transitions>
                        <div className="centerd1 sm:w-3/5 sm:mx-auto md:w-3/5 md:mx-auto lg:w-3/5 lg:mx-auto ds rounded">
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '8rem' }}
                                    image="https://i.imgur.com/poFWJfz.png"
                                    alt="avatar"
                                    style={{ margin: '20px' }}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography style={{ margin: '20px', paddingLeft: '25px' }} component="div" variant="h5">
                                            Username
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, pb: 5 }}>
                                        <button
                                            type="button"
                                            disabled={this.state.loading}
                                            className={`text-white w-40 rounded h-8 font-bold border`}
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
                                        <form
                                            onSubmit={this.sendEmail}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                className="text-sm darkthemebg text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                                name="username"
                                            />


                                            <input
                                                type="text"
                                                placeholder="Email"
                                                className="text-sm darkthemebg text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                                name="email"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="text-sm darkthemebg text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                                name="subject"
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