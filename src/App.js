import { ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors';
import React, { Suspense, Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'

document.body.style.backgroundImage = "url(https://static.onecms.io/wp-content/uploads/sites/44/2022/08/02/how-to-stock-your-pantry.jpg)";
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
          </Switch>
        </Router>
      </ThemeProvider>
    </>
    </Suspense>
    );
  }
}