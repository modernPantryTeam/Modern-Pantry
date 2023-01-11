import * as React from "react";
import { useState } from "react";
import Drawer from "../components/Drawer";
import WButtonCustom from '../components/WButtonCustom.js'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import pantryService from "../services/pantry-service";
import Transitions from "../components/Transition";
import "../sass/css/dashboard.css";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, CardMedia, Typography, CardActions, Button, Card, CardContent } from "@mui/material";

function Dashboard() {

    const handleConfirm = async (id, status) => {
            await pantryService.processInvite(id, status);
            const updatedInvites = invites.filter(invite => invite.id !== id);
            setInvites(updatedInvites);
    }

    const handleDeny = async (id, status) => {
            await pantryService.processInvite(id, status);
            const updatedInvites = invites.filter(invite => invite.id !== id);
            setInvites(updatedInvites);

    }

    const [invites, setInvites] = useState([]);

    document.addEventListener("DOMContentLoaded", () => {
        pantryService.getCurrentInvites().then(response => {
            setInvites(response.content);
            console.log(response.content)
        });
    });

    if (invites.length === 0) {
        return (
            <><Drawer></Drawer>
                <Transitions>
                    <section>
                        <div className='pantry-info'>
                            <p className="text-base text-gray-700 md:text-lg text-white">
                                You don't have any pending invites.
                            </p>
                            <div className='button-box'>
                                <WButtonCustom link="/dashboard" name="Dashboard" icon={<HomeOutlinedIcon />} />
                            </div>
                        </div>
                    </section>
                </Transitions>
            </>
        );
    } else {
        var renderedOutput = invites.map(invite => (
            <div>
                {
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component='img'
                            height='200'
                            image='https://i.imgur.com/l9bl8WO.png'
                            alt='pantry invitation'
                        />
                        <CardContent>
                            <Typography gutterBottom variant='h6' component='div'>
                                You have been invited to a pantry&nbsp;
                                <span style={{ fontWeight: 'bold' }}>{invite.pantryName}</span>
                                &nbsp;by&nbsp;
                                <span style={{ fontWeight: 'bold' }}>{invite.sender.username}</span>.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container direction='row' justifyContent='flex-start'>
                                <Button
                                    startIcon={<CheckIcon />}
                                    size='small'
                                    color='inherit'
                                onClick={() => handleConfirm(invite.inviteId, true)}
                                >
                                    Accept
                                </Button>
                            </Grid>
                            <form>
                                <Button
                                    startIcon={<CloseIcon />}
                                    style={{ justifyContent: 'flex-end' }}
                                    color="inherit"
                                    size="small"
                                onClick={() => handleDeny(invite.inviteId, false)}
                                >
                                    Deny
                                </Button>
                            </form>
                        </CardActions>
                    </Card>
                }
            </div>
        ));

        return (
            <>
                <Drawer></Drawer>
                <Transitions>
                    <div className='container'>
                        <div className='pantry-result'>
                            <div id='pantry' style={{ paddingLeft: "56px" }}>
                                {renderedOutput}
                            </div>
                        </div>
                    </div>
                </Transitions>
            </>
        );
    }
}

export default Dashboard;
