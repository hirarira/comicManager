import { FC } from "react";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    marginLeft: '2rem'
  }
}));

const Header: FC = (()=>{
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                漫画管理アプリ
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  )
});

export default Header;