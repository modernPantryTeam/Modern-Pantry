import React from 'react';
import Headbar from '../components/Headbar';
import { AppBar, Toolbar, Grid } from '@mui/material'
import ButtonCustom from '../components/ButtonCustom'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import authService from '../services/auth-service';
import { Component } from 'react';
import userService from '../services/user-service';
import logger from '../logger/logger'

const addDataIntoCache = (cacheName, url, response) => {
    const data = new Response(JSON.stringify(response));
  
    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data);
      });
    }
  };
  
  
  export default class Login extends Component {
    constructor(props) {
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangePassword = this.onChangePassword.bind(this);
      this.state = {
        username: "",
        password: "",
        loading: false,
        message: ""
      };
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      });
    }
  
    onChangePassword(e) {
      this.setState({
        password: e.target.value
      });
    }
  
    handleLogin(e) {
      e.preventDefault();
      this.setState({
        message: "",
        loading: true
      });
  
      authService.login(
        this.state.username,
        this.state.password).then(
          () => {
            userService.login().then(
              () => {
                window.location.reload();
              },
              error => {
                logger.log("Login.js")
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
            logger.log("Login.js")
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
          }
        )
    }

    render() {
        return (
          <><><Headbar></Headbar>

          </><div className="container flex mx-auto items-center h-screen">
              <div className="flex w-full">
              </div>
              <div className="flex flex-col w-5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                  <h1 className="flex justify-center w-full">
                    <img src="https://i.imgur.com/YtiHDru.png" alt="Pantry" className="mt-2 w-4/12 mb-2" />
                  </h1>
    
                  {this.state.message && (
                    <p className="mb-4 text-xs text-red-primary">
                      {this.state.message}
                    </p>
                  )}
                  <form onSubmit={this.handleLogin}>
    
                    <input
                      aria-label="Enter your Username"
                      placeholder='Username'
                      type="text"
                      className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                      onChange={this.onChangeUsername}
                      value={this.state.username}
                    />
    
    
                    <input
                      aria-label="Enter your password"
                      placeholder='Password'
                      type="password"
                      className="text-sm text-gray-base w-full mr-3 py-3 px-4 h-2 border border-gray-primary rounded mb-2"
                      onChange={this.onChangePassword}
                      value={this.state.password}
                    />
    
    
                    <button
                      type="submit"
                      disabled={this.state.loading}
                      className={`bg-black-medium text-white w-full rounded h-8 font-bold`}
                    >
                      Login
                      {this.state.loading && ("...")}
                    </button>
    
                  </form>
                </div>
              </div>
            </div></>
        );
      }
    }
