import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import AdminRoute from './components/routes/AdminRoute';
import OtherPage from './components/pages/OtherPage';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';

const App = ({ location }) => (
  <div className="ui container">
    <TopNavigation />
    <Route location={location} path="/" exact component={HomePage} />
    <AdminRoute location={location} path="/dashboard" exact component={AdminPage} />
    <GuestRoute location={location} path="/other" exact component={OtherPage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
  };
}

export default connect(mapStateToProps)(App);
