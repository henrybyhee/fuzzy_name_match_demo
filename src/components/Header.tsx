import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const headerStyles = makeStyles((theme: Theme) =>
  createStyles({
    getBottomSpace: {
      marginBottom: "3rem"
    },
    name: {
      fontWeight: 800,
      fontSize: "4rem",
      color: "rgb(70,70,70)"
    },
    container: {
      marginTop: "1rem"
    },
    headerContainer: {
      marginBottom: "2rem"
    },
    titleArea: {
      textAlign: "justify"
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "rgb(100,100,100)"
    },
    link: {
      fontSize: "inherit",
      textDecoration: "none",
      color: theme.palette.primary.main,
      fontWeight: 700,
      "&:hover": {
        height: "100%",
        color: "tomato"
      }
    }
  })
);

export function HeaderComponent() {
  const classes = headerStyles();
  return (
    <Container maxWidth="md" className={classes.getBottomSpace}>
      <Grid container direction="column" className={classes.container}>
        <Grid item className={classes.headerContainer}>
          <Typography variant="h2" component="h2" className={classes.name}>
            Fuzzy Name Matching
          </Typography>
        </Grid>

        <Grid item className={classes.titleArea}>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.subtitle}
          >
            Match multiple names at speed using classic fuzzy matching
            algorithms (Jaro-Winkler, Soundex)!
            <br />
            <a
              className={classes.link}
              href="https://github.com/Henry-bee/fuzzy_name_match"
            >
              Algorithms are written in Rust for maximum performance.
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
