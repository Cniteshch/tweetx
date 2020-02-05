import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/index";
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from '../assets/react-toolbox/theme.js'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HomePage from "./containers";
import FeedingPage from "./containers/feed";
import ProfilePage from "./containers/profilePage";
import UsersPage from "./containers/user";
import RequireAuth from './components/template/requireAuth'
import "../assets/react-toolbox/theme.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, applyMiddleware(reduxThunk));
const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/feeds" component={RequireAuth(FeedingPage)}  />
        <Route path="/profile" component={RequireAuth(ProfilePage)}  />
        <Route path="/users" component={RequireAuth(UsersPage)}  />
        </Switch>
      </BrowserRouter>
      </MuiThemeProvider>
    </ThemeProvider>
  </Provider>,
  rootElement
);
