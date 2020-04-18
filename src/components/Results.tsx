import React from "react";
import {
  Typography,
  Paper,
  Box
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { NameMatchResult } from "../interfaces/index";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginTop: "2rem",
      padding: "1rem",
      alignItems: "center"
    },
    queryNameArea: {
      marginBottom: "1rem",
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    queryNameTitle: {
      fontSize: "1.2rem",
      fontWeight: 800,
      color: "rgb(70,70,70)",
      letterSpacing: "0.05rem"
    },
    resultCard: {
      padding: "0.5rem 0.5rem 0.5rem 0.5rem",
      marginBottom: "1rem",
      width: "50%",
      [theme.breakpoints.down("sm")]: {
        width: "100%"
      }
    },
    headerArea: {
      paddingLeft: "1rem",
      paddingTop: "0.5rem"
    },
    headerText: {
      fontSize: "1.2rem",
      fontWeight: 800,
      color: "rgb(70,70,70)"
    },
    resultContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "0.5rem",
      paddingBottom: "0.5rem"
    },
    contentRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "0.5rem",
      width: "70%"
    },
    contentLabelArea: {
      width: "50%",
      textAlign: "center"
    },
    contentDataArea: {
      width: "50%",
      textAlign: "center"
    },
    label: {
      color: "rgb(88, 96, 105)",
      fontWeight: 500,
      fontSize: "0.9rem"
    },
    text: {
      fontWeight: 800,
      fontSize: "1.1rem"
    },
    resultFooter: {
      display: "flex",
      justifyContent: "flex-end",
      paddingRight: "1rem"
    },
    greenScore: {
      fontSize: "2rem",
      color: "green",
      fontWeight: 700
    },
    redScore: {
      fontSize: "2rem",
      color: "#e53935",
      fontWeight: 700
    }
  })
);

interface ResultProps {
  results: NameMatchResult[];
}

const toPercentage = (score: number) => (score * 100).toFixed(2);

export function ResultsComponent(props: ResultProps) {
  const classes = styles();
  const { results } = props;
  return (
    <div className={classes.root}>
      {results.length > 0 && (
        <Box className={classes.queryNameArea}>
          <Typography variant="h4" className={classes.queryNameTitle}>
            Matches of "<i>{results[0].name1}</i>":
          </Typography>
        </Box>
      )}
      {results.map((result, idx) => {
        return (
          <Paper className={classes.resultCard} elevation={2}>
            <Box className={classes.headerArea}>
              <Typography
                variant="h5"
                component="h5"
                className={classes.headerText}
              >
                #{idx + 1} {result.name2}
              </Typography>
            </Box>
            <Box className={classes.resultContent}>
              {result.results.map(result => (
                <Box className={classes.contentRow}>
                  <Box className={classes.contentLabelArea}>
                    <Typography variant="body1" className={classes.label}>
                      {result.algorithm}
                    </Typography>
                  </Box>
                  <Box className={classes.contentDataArea}>
                    <Typography variant="body1" className={classes.text}>
                      {toPercentage(result.absolute_score)}%
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className={classes.resultFooter}>
              <Typography
                variant="h5"
                component="h5"
                className={
                  result.score >= 0.5 ? classes.greenScore : classes.redScore
                }
              >
                {toPercentage(result.score)}%
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </div>
  );
}
