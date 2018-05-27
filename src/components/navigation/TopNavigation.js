import { AppBar, Toolbar, Button, IconButton, Typography, withStyles } from "@material-ui/core";
import { MediaQuery } from "react-responsive";
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types'
import React from 'react';

import SpearTip from '../../resources/speartip_bold.svg'

const style = {
  navBarBurger: {
    marginLeft: -12,
    marginRight: 20,
  },

  navBarRoot: {
    flexGrow: 1,
    zIndex: 10,
    position:'relative',
  },

  navBarTitle: {
    flex:1,
  },
  image:{
    top: 0,
    height: 50,
    margin: '5px 5px',
    '@media (min-width: 800px)':{
      margin: 10
    },
    '@media (min-width: 1200px)':{
      margin: '10px 10px'
    },
  },
}

const TopNavigation = ({classes}) => (
  <AppBar position="static" className={classes.navBarRoot}>
    <Toolbar disableGutters>
      <img src={SpearTip} alt="Speartip solutions logo" className={classes.image}/>
      <Typography variant="display1" color="inherit" className={classes.navBarTitle}>
        Speartip Solutions
      </Typography>
      <Button color="inherit" className="nav-bar-login">Login</Button>
    </Toolbar>
  </AppBar>
);

TopNavigation.propTypes = {
  classes: PropTypes.object.isRequired, 
};

export default withStyles(style)(TopNavigation)