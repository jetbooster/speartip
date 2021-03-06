import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CssBaseline } from '@material-ui/core';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ddd',
    },
    secondary: {
      main: '#4dd0e1',
    },
  },
});

if (localStorage.bookwormJWT) {
  const payload = decode(localStorage.bookwormJWT);
  const user = {
    token: localStorage.bookwormJWT,
    email: payload.email,
    confirmed: payload.confirmed,
  };
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <div>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <Route component={App} />
        </Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  </div>,
  document.getElementById('root'),
);
registerServiceWorker();
