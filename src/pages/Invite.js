import React, { Component } from 'react';
import authService from '../services/auth-service';
import userService from '../services/user-service';
import Headbar from '../components/Headbar';
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
                    this.setState({
                        message: response.data.message,
                        successful: true,
                        loading: false
                    });
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
            <><><Headbar></Headbar>
            </>
                <Transitions>
                    <div className="container flex mx-auto items-center h-screen">
                        <div className="sm:w-20 md:w-full lg:w-full">
                        </div>
                        <div className="flex flex-col w-4\/5">
                            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                                <h1 className="flex justify-center w-full">
                                    <img src="https://i.imgur.com/YtiHDru.png" alt="Pantry" className="mt-2" />
                                </h1>
                                {this.state.message && (
                                    <p className='mb-4 text-xs text-red-primary'>
                                        {this.state.message}
                                    </p>
                                )}
                                <form
                                    onSubmit={this.handleInvite}
                                >

                                    <input
                                        type="text"
                                        placeholder="Email address"
                                        className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                        onChange={this.onChangeEmail}
                                        value={this.state.email}
                                        disabled={this.state.successful}
                                    />

                                    <input
                                        type="text"
                                        placeholder="Pantry ID"
                                        className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                                        onChange={this.onChangePantryID}
                                        value={this.state.pantryID}
                                        disabled={this.state.successful}
                                    />

                                    <button
                                        disabled={this.state.loading || this.state.successful}
                                        type="submit"
                                        className={`bg-black-medium text-white w-full rounded h-8 font-bold`}
                                    >
                                        Invite
                                        {this.state.loading && <Spinner size="sm" animation="border" role="status">
                                            <span className="visually-hidden">Signing up...</span>
                                        </Spinner>}
                                        {this.state.successful && <Redirect replace to="/dashboard" />}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Transitions>
            </>
        );
    }
}