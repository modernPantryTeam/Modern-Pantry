import React, { Suspense, Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/not-found'
import Dashboard from './pages/Dashboard'
import Add from './pages/Add'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

document.body.style.backgroundImage = "url(https://makviphomeservices.com/wp-content/uploads/2022/03/pantryOrganization.png)";
document.body.style.backgroundSize = "cover";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
typography: {
  fontFamily: 'Quicksand',
  fontWeightLight: 400,
  fontWeightRegular: 500,
  fontWeightMedium: 600,
  fontWeightBold: 700,
}
})

export default class App extends Component {

  render() {
    return(
      <Suspense fallback="Loading..." >
      <>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/add">
              <Add />
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