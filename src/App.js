import React, { Suspense, Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Invites from "./pages/Invites";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Pantry from "./pages/Pantry";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Invite from "./pages/Invite";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";

import authService from "./services/auth-service";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		fontFamily: "Quicksand",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: authService.loggedIn(),
		};
	}

	render() {
		return (
			<Suspense fallback='Loading...'>
				<>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Router>
							<Switch>
								<Route exact path='/'>
									{this.state.loggedIn ? (
										<Redirect to='/dashboard' />
									) : (
										<Home />
									)}
								</Route>
								<Route path='/login'>
									{this.state.loggedIn ? <Redirect to='/profile' /> : <Login />}
								</Route>
								<Route path='/sign-up'>
									{this.state.loggedIn ? <Redirect to='/' /> : <SignUp />}
								</Route>
								<Route path='/create'>
									{!this.state.loggedIn ? <Redirect to='/login' /> : <Create />}
								</Route>
								<Route path='/invites'>
									{!this.state.loggedIn ? <Redirect to='/invites' /> : <Invites />}
								</Route>
								<Route path='/profile'>
									{!this.state.loggedIn ? (
										<Redirect to='/login' />
									) : (
										<Profile />
									)}
								</Route>
								<Route path='/dashboard'>
									{!this.state.loggedIn ? (
										<Redirect to='/login' />
									) : (
										<Dashboard />
									)}
								</Route>
								<Route path='/statistics'>
									{!this.state.loggedIn ? (
										<Redirect to='/login' />
									) : (
										<Statistics />
									)}
								</Route>
								<Route path='/pantry/:id' component={Pantry}>
									{!this.state.loggedIn ? <Redirect to='/login' /> : <Pantry />}
								</Route>
								<Route path='/add-product'>
									{!this.state.loggedIn ? (
										<Redirect to='/login' />
									) : (
										<AddProduct />
									)}
								</Route>
								<Route path='/invite'>
									{!this.state.loggedIn ? (
										<Redirect to='/login' />
									) : (
										<Invite />
									)}
								</Route>
								<Route path='/edit-product/:product' component={EditProduct}>
									{!this.state.loggedIn ? <Redirect to='/login' /> : <EditProduct />}
								</Route>
								<Route component={NotFound} />
							</Switch>
						</Router>
					</ThemeProvider>
				</>
			</Suspense>
		);
	}
}