import React from "react";
import { Typography, Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: "1rem"
    },
    algoLink: {
      textDecoration: "none",
      fontWeight: 700,
      color: theme.palette.primary.main,
      "&:hover": {
        height: "100%",
        color: "tomato"
      }
    },
    header: {
      color: "rgb(70,70,70)",
      fontWeight: 900
    }
  })
);

export function GuideComponent() {
  const classes = styles();
  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="h5" component="h5" className={classes.header}>
          How it works?
        </Typography>
      </Box>

      <Box>
        <ol>
          <Typography variant="body1" component="li">
            Enter a name for query.
          </Typography>
          <Typography variant="body1" component="li">
            Enter one or more similar names to compare.
          </Typography>
          <Typography variant="body1" component="li">
            Similarity score between query name and each similar name is
            calculated.
          </Typography>
          <Typography variant="body1" component="li">
            To determine similarity, these algorithms are used with equal
            weightage:
          </Typography>
          <ul>
            <li>
              <Typography variant="body2">
                <a
                  className={classes.algoLink}
                  href="https://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance"
                >
                  Jaro-Winkler Distance
                </a>{" "}
                (50%)
              </Typography>
            </li>

            <li>
              <Typography variant="body2">
                <a
                  className={classes.algoLink}
                  href="https://en.wikipedia.org/wiki/Jaccard_index"
                >
                  Jaccard Index
                </a>{" "}
                of{" "}
                <a
                  className={classes.algoLink}
                  href="https://en.wikipedia.org/wiki/Soundex"
                >
                  Soundex
                </a>{" "}
                Matches(50%)
              </Typography>
            </li>
          </ul>
          <Typography variant="body1" component="li">
            Comparison results will be returned in descending order of
            similarity.
          </Typography>
        </ol>
      </Box>
    </div>
  );
}
