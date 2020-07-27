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
  headerTitle: {
    fontSize: '1.5rem',
    marginLeft: '2rem'
  },
  title: {
    marginTop: '1rem',
    fontSize: '2rem',
    color: '#778899'
  }
}));

const Header: FC = (()=>{
  const classes = useStyles();
  const clickMenu = () => {
    console.log("click!");
  }
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={clickMenu}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.headerTitle}>
                漫画管理アプリ
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12} className={classes.title}>
          漫画管理アプリ
        </Grid>
      </Grid>
    </div>
  )
});

export default Header;