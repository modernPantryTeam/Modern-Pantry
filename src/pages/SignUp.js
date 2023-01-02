import React, { Component } from 'react';
import authService from '../services/auth-service';
import userService from '../services/user-service';
import Headbar from '../components/Headbar';
import Transitions from '../components/Transition'
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from "react-router-dom";
import {useEffect} from 'react';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.state = {
      username: "",
      password: "",
      email: "",
      successful: false,
      loading: false,
      message: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
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

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    authService.register(
      this.state.username,
      this.state.password,
      this.state.email).then(
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

  handleProfile(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
      loading: true
    });

    userService.register(
      this.state.name,
      this.state.lastname,
      this.state.description).then(
        response => {
          this.setState({
            message: response.data.message,
            loading: false
          });
        },
        error => {
          console.log(error);
          const resMessage = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
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
          <script src="https://apis.google.com/js/platform.js" async defer></script>
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
                    onSubmit={this.handleRegister}
                  >

                    <input
                      type="text"
                      placeholder="Username"
                      className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                      onChange={this.onChangeUsername}
                      value={this.state.username}
                      disabled={this.state.successful}
                    />

                    <input
                      type="text"
                      placeholder="Email address"
                      className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                      onChange={this.onChangeEmail}
                      value={this.state.email}
                      disabled={this.state.successful}
                    />

                    <input
                      type="password"
                      placeholder="Password"
                      className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                      onChange={this.onChangePassword}
                      value={this.state.password}
                      disabled={this.state.successful}
                    />
                    <button
                      disabled={this.state.loading || this.state.successful}
                      type="submit"
                      className={`bg-black-medium text-white w-full rounded h-8 font-bold`}
                    >
                      Sign Up  
                      {this.state.loading && <Spinner size="sm" animation="border" role="status">
											<span className="visually-hidden">Signing up...</span>
										</Spinner>}
                    {this.state.successful && <Redirect replace to="/login" />}
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