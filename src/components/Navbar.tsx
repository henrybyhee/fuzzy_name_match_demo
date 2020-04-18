import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, Grid, Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      background: "#f2f2f2"
    },
    linkBox: {
      marginRight: "2rem"
    },
    link: {
      "&:hover": {
        height: "100%",
        color: "tomato",
        textDecoration: "none"
      }
    },
    linkText: {
      fontWeight: 550,
      textDecoration: "none",
      fontSize: "1.2rem",
      color: "#333",
      "&:hover": {
        height: "100%",
        color: "tomato",
        textDecoration: "none"
      }
    }
  })
);
export function NavBarComponent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Grid
            container
            direction="row"
            alignContent="center"
            alignItems="center"
          />

          <Grid item className={classes.linkBox}>
            <Link
              href="https://github.com/Henry-bee/fuzzy_name_match_demo"
              className={classes.link}
            >
              <Typography variant="body1" className={classes.linkText}>
                Github
              </Typography>
            </Link>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
