import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import validator from "validator";

const noErrorsState = {
  message: "",
  validation: {
    email: "",
    password: ""
  }
};

class LoginComponent extends React.Component {
  state = {
    email: "",
    password: "",
    error: noErrorsState
  };

  validateForm = () => {
    if (!validator.isEmail(this.state.email)) {
      this.setState({
        loading: false,
        error: {
          ...this.state.error,
          validation: {
            ...this.state.error.validation,
            email: "Email field must contain a valid email address."
          }
        }
      });
      return false;
    }
    return true;
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.setState({ error: noErrorsState });
    const { email, password } = this.state;
    if (!this.validateForm()) return;

    const user = {
      email: email,
      password: password
    };
    try {
      const result = await axios.post(
        "http://localhost:8080/api/auth/login",
        user
      );
      this.props.login(result.data);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user.name));
      this.props.history.push("/blogs");
    } catch (err) {
      console.log(err.response);
      this.setState({
        errors: err.response.data.message
      });
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Jumbotron className="registerPost">
                <Row>
                  <Col md={{ span: 4, offset: 4 }}>
                    <p className="signUpTitle">
                      <FontAwesomeIcon
                        className="iconSignUp"
                        icon="sign-in-alt"
                      />
                      Sign in
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 10, offset: 1 }}>
                    <Form onSubmit={this.handleSubmit} className="loginForm">
                      <Form.Group>
                        <Form.Control
                          id="standard-email"
                          className="emailInput"
                          name="email"
                          type="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                        <p className="errors">
                          {this.state.error.validation.email}
                        </p>
                        <Form.Control
                          placeholder="Password"
                          id="standard-password"
                          className="passwordInput"
                          name="password"
                          type="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                        <p className="errors">
                          {this.state.error.validation.password}
                        </p>
                        <p className="errors">{this.state.errors}</p>
                        <Button
                          type="submit"
                          className="loginButton"
                          variant="outline-success"
                        >
                          Sign in
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(LoginComponent);
