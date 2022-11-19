import React, { Suspense, Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NotFound from './pages/not-found'
import Dashboard from './pages/Dashboard'
import Create from './pages/Create'
import Statistics from './pages/Statistics'
import Profile from './pages/Profile'
import Pantry from './pages/Pantry'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation, useHistory } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";

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

const Animated = () => {
  const location = useLocation();
  return (
    <Suspense fallback="Loading..." >
      <>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AnimatePresence exitBeforeEnter >
            <Switch location={location}
              key={location.pathname}>
              <Route exact path="/" component={Home}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/sign-up" component={SignUp}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/create" component={Create}></Route>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/statistics" component={Statistics}></Route>
              <Route path="/pantry" component={Pantry}></Route>
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </ThemeProvider>
      </>
    </Suspense>
  )
}

function App() {
  return (
    <div>
      <>
        <Router>
          <Animated />
        </Router>
      </>
    </div>
  );
}

export default App;