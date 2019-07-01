import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { signup } from "../actions/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import _ from "lodash";
import validator from "validator";

const noErrorsState = {
  message: "",
  validation: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  }
};

class SignUpComponent extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    error: noErrorsState
  };

  // componentDidMount() {
  //   ValidatorForm.addValidationRule("isPasswordMatch", value => {
  //     if (value !== this.state.password) {
  //       return false;
  //     }
  //     return true;
  //   });
  // }

  validateForm = () => {
    let validationErrors = {};

    if (!validator.isEmail(this.state.email)) {
      validationErrors["email"] =
        "Email field must contain a valid email address.";
    }

    if (validator.isEmpty(this.state.name)) {
      validationErrors["name"] = "Name field is required";
    }

    if (validator.isEmpty(this.state.password)) {
      validationErrors["password"] = "Password field is required";
    }

    if (
      validator.isEmpty(this.state.confirmPassword) ||
      this.state.confirmPassword !== this.state.password
    ) {
      validationErrors["confirmPassword"] =
        "Password confirmation field is required and must match previous password";
    }

    if (!_.isEmpty(validationErrors)) {
      this.setState({
        error: {
          ...this.state.error,
          validation: {
            ...this.state.error.validation,
            ...validationErrors
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

  handleFileChange = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.setState({ error: noErrorsState });
    const { name, email, password, image } = this.state;
    if (!this.validateForm()) return;
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", password);
      formData.append("image", image);
      const result = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData,
        {
          "Content-Type": "multipart/form-data"
        }
      );
      console.log(result);
      this.props.signup(result.data);
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
                      Sign up
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ span: 10, offset: 1 }}>
                    <Form onSubmit={this.handleSubmit} className="registerForm">
                      <Form.Group>
                        <Form.Control
                          id="standard-name"
                          type="text"
                          placeholder="Name"
                          className="titleInput"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                        />

                        <p className="errors">
                          {this.state.error.validation.name}
                        </p>

                        <Form.Control
                          type="email"
                          placeholder="Email"
                          id="standard-email"
                          className="emailInput"
                          name="email"
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
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleInputChange}
                        />
                        <p className="errors">
                          {this.state.error.validation.password}
                        </p>

                        <Form.Control
                          placeholder="Confirm Password"
                          id="standard-confirm-password"
                          className="passwordInput"
                          type="password"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.handleInputChange}
                        />

                        <p className="errors">
                          {this.state.error.validation.confirmPassword}
                        </p>

                        <input
                          id="fileInput"
                          className="fileInput"
                          type="file"
                          name="image"
                          onChange={this.handleFileChange}
                        />
                        <br />
                        <p className="errors">{this.state.errors}</p>
                        <Button
                          type="submit"
                          className="signUpButton"
                          variant="outline-success"
                        >
                          Save
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
  { signup }
)(SignUpComponent);
