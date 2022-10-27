import React, { Component } from 'react';
import authService from '../services/auth-service';
import userService from '../services/user-service';
import logger from '../logger/logger'
import Headbar from '../components/Headbar';

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
      name: "",
      lastname: "",
      description: "",
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

    logger.log("SignUp.js")
    logger.log(this.state.username)
    logger.log(this.state.password)
    logger.log(this.state.email)

    authService.register(
      this.state.username,
      this.state.password,
      this.state.email).then(
        response => {
          logger.log("SignUp.js")
          logger.log(response)
          this.setState({
            message: response.data.message,
            successful: true,
            loading: false
          });
          authService.login(
            this.state.username,
            this.state.password
          )
        },
        error => {
          logger.log("SignUp.js")
          logger.error(error);
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


    logger.log("SignUp.js")
    logger.log(this.state.name)
    logger.log(this.state.lastname)
    logger.log(this.state.description)

    userService.register(
      this.state.name,
      this.state.lastname,
      this.state.description).then(
        response => {
          logger.log("SignUp.js")
          logger.log(response);
          this.setState({
            message: response.data.message,
            loading: false
          });
          userService.login().then(
            () => {
              window.location.reload();
            },
            error => {
              logger.log("SignUp.js")
              logger.error(error)
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
            });
        },
        error => {
          logger.log("SignUp.js")
          logger.error(error)
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
      <script src="https://apis.google.com/js/platform.js" async defer></script>
        <div className="container flex mx-auto items-center h-screen">
          <div className="flex w-full">
          </div>
          <div className="flex flex-col w-5">
            <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
              <h1 className="flex justify-center w-full">
                <img src="https://i.imgur.com/YtiHDru.png" alt="Pantry" className="mt-2 w-4/12" />
              </h1>

              {this.state.successful && (
                <form
                  onSubmit={this.handleProfile}
                >

                  <input
                    type="text"
                    placeholder="First name"
                    className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={this.onChangeName}
                    value={this.state.Name}
                  />

                  <input
                    type="text"
                    placeholder="Last name"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={this.onChangeLastname}
                    value={this.state.lastname}
                  />

                  <input
                    type="text"
                    placeholder=""
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                    onChange={this.onChangeDescription}
                    value={this.state.description}
                  />
                  <button
                    type="submit"
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold`}
                  >
                    {this.state.loading && ("...")}
                  </button>
                </form>)}
              {!this.state.successful && <p className="mb-4 text-xs text-red-primary">{this.state.message}</p>}
              {!this.state.successful && (
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
                    {this.state.loading && ("...")}
                  </button>
                </form>)}
            </div>
            <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
              <p className="text-sm text-black">
                Or continue with:
              </p>
              <p className="text-sm text-black">Sign in with Google</p>
              <p className="text-sm text-black">Sign in with Facebook</p>
              <p className="text-sm text-black">Sign in with Github</p>
            </div>
          </div>
        </div></>

    );
  }
}