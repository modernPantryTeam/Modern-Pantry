import React, { Component } from 'react';
import { Button, Card, CardContent, TextField, Grid } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import authService from '../services/auth-service';
import userService from '../services/user-service';
import Drawer from '../components/Drawer';
import Transitions from '../components/Transition'
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from "react-router-dom";
import { useEffect } from 'react';
import pantryService from '../services/pantry-service';

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

export default class Invite extends Component {
    constructor(props) {
        super(props);
        this.handleInvite = this.handleInvite.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePantryID = this.onChangePantryID.bind(this);
        this.state = {
            pantryID: "",
            email: "",
            successful: false,
            loading: false,
            message: ""
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePantryID(e) {
        this.setState({
            pantryID: e.target.value
        });
    }

    handleInvite(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false,
            loading: true
        });

        pantryService.invite(
            this.state.email,
            this.state.pantryID).then(
                response => {
                    if(response.successStatus === false){
                        this.setState({
                            message: response.message,
                            successful: false,
                            loading: false
                        });
                    } else {
                        this.setState({
                            message: response.message,
                            successful: true,
                            loading: true
                        });
                    }
                },
                error => {
                    const resMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.setState({
                        successful: false,
                        loading: false,
                        message: resMessage
                    });
                }
            );
    }

    render() {
        return (
            <><Drawer></Drawer>
                <Transitions>
                    <div className='px-4 pb-2 pt-4 lg:mx-auto md:mx-auto ml-14 sm:max-w-xl lg:max-w-screen-xl md:px-24 lg:px-8'>
                        <Grid
                            container
                            spacing={0}
                            direction='column'
                            alignItems='center'
                            justify='center'
                        >
                            <Grid item xs={3}>
                                <div>
                                    <Card style={{ marginTop: "20px"}} elevation={5}>
                                        <p className='pt-4 pl-2 text-medium'>Invite your friends</p>
                                        <CardContent>
                                            {this.state.message && (
                                                <p className='mb-4 text-xs text-red-primary'>
                                                    {this.state.message}
                                                </p>
                                            )}
                                            <form
                                                Validate
                                                autoComplete='off'
                                                onSubmit={this.handleInvite}
                                            >

                                                <TextField
                                                    style={{ marginTop: "10px" }}
                                                    label={"Email adress"}
                                                    type="text"
                                                    required
													color='secondary'
                                                    variant='outlined'
													fullWidth
                                                    placeholder="Email address"
                                                    onChange={this.onChangeEmail}
                                                    value={this.state.email}
                                                    disabled={this.state.successful}
                                                />

                                                <TextField
                                                    style={{ marginTop: "10px" }}
                                                    type="text"
                                                    label={"Pantry ID"}
                                                    variant='outlined'
													fullWidth
                                                    required
													color='secondary'
                                                    placeholder="Pantry ID"
                                                    onChange={this.onChangePantryID}
                                                    value={this.state.pantryID}
                                                    disabled={this.state.successful}
                                                />

                                                <Button
                                                    disabled={this.state.loading || this.state.successful}
                                                    type="submit"
                                                    style={{ marginTop: "24px", color: "white" }}
                                                    endIcon={<SendOutlinedIcon />}
                                                >
                                                    Invite
                                                    {this.state.loading && <Spinner size="sm" animation="border" role="status">
                                                        <span className="visually-hidden">Signing up...</span>
                                                    </Spinner>}
                                                    {this.state.successful && <Redirect replace to="/dashboard" />}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Transitions>
            </>
        );
    }
}
