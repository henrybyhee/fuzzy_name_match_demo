import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Box
} from "@material-ui/core";
import { AddCircleRounded, DeleteRounded } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { NameMatchResult } from "../interfaces";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      marginTop: "3rem"
    },
    containerItem: {
      margin: "2rem 0rem 2rem 0rem",
      background: "red"
    },
    title: {
      fontWeight: 600,
      color: "rgb(70,70,70)",
      letterSpacing: "0.02rem"
    },
    titleContainer: {
      marginBottom: "0.5rem"
    },
    formContainer: {
      margin: "0rem 0rem 0rem 2rem"
    },
    textFieldContaier: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      marginBottom: "0.5rem"
    },
    textField: {
      width: "80%"
    },
    trashIcon: {
      width: "20%"
    },
    errorMessage: {
      color: "red"
    }
  })
);

interface InputProps {
  against: string[];
  name: string;
  pristine: boolean;
  errorMessage: string;
  nameMatchResults: NameMatchResult[];
  onNameChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onListChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ): void;
  onListAdd(): void;
  onListRemove(idx: number): void;
  onSubmit(): void;
}

export function InputComponent(props: InputProps) {
  const classes = styles();

  const {
    against,
    name,
    pristine,
    errorMessage,
    onNameChange,
    onListAdd,
    onListChange,
    onListRemove,
    onSubmit
  } = props;

  const disableSubmit =
    !pristine && (name === "" || against.some(name => name === ""));
  return (
    <Grid container className={classes.background} justify="center" spacing={3}>
      <Grid item xs={12} md={8}>
        <Box display="flex" flexDirection="column" alignContent="center">
          <Box className={classes.titleContainer}>
            <Typography variant="h6" component="h6" className={classes.title}>
              Query name:
            </Typography>
          </Box>
          <Box>
            <TextField
              required
              className={classes.textField}
              error={!pristine && name === ""}
              id="outlined-required"
              label="Required"
              variant="outlined"
              value={name}
              onChange={event => onNameChange(event)}
            />
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box display="flex" flexDirection="column" alignContent="center">
          <Box className={classes.titleContainer}>
            <Typography variant="h6" component="h6" className={classes.title}>
              Similar name(s):
            </Typography>
          </Box>
        </Box>

        {against.map((inputName, index) => {
          return (
            <Box className={classes.textFieldContaier}>
              <Box className={classes.textField}>
                <TextField
                  required
                  fullWidth
                  error={!pristine && against[index] === ""}
                  id="outlined-required"
                  label="Required"
                  variant="outlined"
                  value={inputName}
                  onChange={e => onListChange(e, index)}
                />
              </Box>

              <Box className={classes.trashIcon}>
                {index !== 0 && (
                  <IconButton onClick={() => onListRemove(index)}>
                    <DeleteRounded />
                  </IconButton>
                )}
              </Box>
            </Box>
          );
        })}

        <IconButton aria-label="add" onClick={onListAdd}>
          <AddCircleRounded />
        </IconButton>
      </Grid>
      <Grid item container alignItems="center" justify="center">
        <Grid item>
          <Typography variant="body1" component="p" color="secondary">
            {errorMessage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={disableSubmit}
            onClick={onSubmit}
          >
            Compare!
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
