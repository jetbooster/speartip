import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from 'recompose/compose'
import { Typography, withStyles, Paper, GridList, GridListTile } from "@material-ui/core";
import * as actions from "../../actions/auth";

import content from "../lists/gridlistData"
import image from '../../resources/bg.png'

const styles = {
  imageContainer:{
    width:'100%',
    height: '800px',
    zIndex: '-1',
    background: `linear-gradient( rgba(180,180,180,0.2), rgba(250,250,250,1) ), url(${image})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  spacerTop:{
    flex: '1 2 1%'
  },
  spacerBottom:{
    flex: '1 2 20%'
  },
  bodyContainer:{
    flex: '1 1 10%',
    display:'flex',
    flexDirection: 'row',
    width:'60%'
  },
  mainBody:{
    width: '100%',
    height: 'fit-content',
    padding:'10px'
  },
  title:{
    width:'50%',
  },
  gridTilePaper:{
    height:'150px',
    margin:'5px 5px 5px 5px',
    padding:'10px'
  },
}

const HomePage = ({ classes }) => (
  <div>
    <div className={classes.imageContainer}>
      <span className={classes.spacerTop}/>
      <Typography variant="display4" className={classes.title} align="center">
        Speartip Solutions:
      </Typography>
      <Typography variant="display4" className={classes.title} align="center">
        Literally anything but PHP.
        {/* &quot;in deum vertit machina&quot; */}
      </Typography>
      <span className={classes.spacerBottom}/>
      <div className={classes.bodyContainer}>
        <Paper elevation={10} className={classes.mainBody}>
          <Typography variant="title">
            Skill Summary
          </Typography>
          <GridList cellHeight={160} cols={3}>
            {content.map((tile,index)=>(
              <GridListTile key={index} cols={tile.cols||1} className={classes.gridTile}>
                <Paper className={classes.gridTilePaper}>
                  <Typography variant="title" gutterBottom>
                    {tile.title}
                  </Typography>
                  <Typography variant="subheading">
                    {tile.content}
                  </Typography> 
                </Paper>
              </GridListTile>
            ))}
          </GridList>
        </Paper>
      </div>
    </div>
  </div>
);

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default compose(
  withStyles(styles, {
    name:'HomePage',
  }),
  connect(mapStateToProps, { logout: actions.logout })
)(HomePage);
