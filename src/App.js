import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors';
import React, { Suspense, Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/not-found'
import Dashboard from './pages/Dashboard'

document.body.style.backgroundImage = "url(https://makviphomeservices.com/wp-content/uploads/2022/03/pantryOrganization.png)";
document.body.style.backgroundSize = "cover";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[100],
    },
    secondary: {
      main: grey[800],
    },
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
      <ThemeProvider theme={theme}>
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
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
    </Suspense>
    );
  }
}