import React from "react";
import { InputComponent } from "../components/Input";
import axios, { AxiosResponse, AxiosError } from "axios";
import { NameMatchResult } from "../interfaces";
import { NameMatchResponse } from "../interfaces/index";
import { ResultsComponent } from "../components/Results";
import { GuideComponent } from "../components/Guide";
import { Container } from "@material-ui/core";

// To be in environment variables
const nameMatchServerUrl = process.env.REACT_APP_BACKEND_URL || "";

interface BodyState {
  against: string[];
  name: string;
  pristine: boolean;
  errorMessage: string;
  nameMatchResults: NameMatchResult[];
}

interface Target {
  value: string;
}

export class BodyContainer extends React.Component<{}, BodyState> {
  public state = {
    against: [""],
    name: "",
    errorMessage: "",
    pristine: true,
    nameMatchResults: []
  };

  onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    const { value } = e.target as Target;
    this.setState({
      name: value,
      pristine: false
    });
  };

  onListChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx: number
  ): void => {
    const { value } = e.target as Target;
    const againstCopy = this.state.against.slice();
    againstCopy.splice(idx, 1, value);

    this.setState({
      against: againstCopy,
      pristine: false
    });
  };

  onListAdd = (): void => {
    this.setState({
      against: [...this.state.against, ""]
    });
  };

  onListRemove = (idx: number): void => {
    const againstCopy = this.state.against.slice();
    againstCopy.splice(idx, 1);

    this.setState({
      against: againstCopy
    });
  };

  onSubmit = (): void => {
    // Check for validation error
    const anyEmpty =
      this.state.name === "" || this.state.against.some(name => name === "");
    if (anyEmpty) {
      this.setState({
        pristine: false,
        errorMessage: "Please fill up all the fields"
      });
      return;
    }

    const requestBody = {
      queryName: this.state.name,
      against: this.state.against
    };
    axios
      .post(nameMatchServerUrl, requestBody)
      .then((value: AxiosResponse<NameMatchResponse>) => {
        const { results } = value.data;
        console.log(results);
        this.setState({
          nameMatchResults: results
        });
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          this.setState({
            errorMessage: err.response.data
          });
        }
      });
  };

  render() {
    return (
      <Container maxWidth="md">
        <GuideComponent />
        <InputComponent
          against={this.state.against}
          name={this.state.name}
          pristine={this.state.pristine}
          errorMessage={this.state.errorMessage}
          onNameChange={this.onNameChange}
          onListAdd={this.onListAdd}
          onListChange={this.onListChange}
          onListRemove={this.onListRemove}
          onSubmit={this.onSubmit}
          nameMatchResults={this.state.nameMatchResults}
        />
        <ResultsComponent results={this.state.nameMatchResults} />
      </Container>
    );
  }
}
