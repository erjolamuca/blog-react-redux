import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import requireAuth from "./requireAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class CreateComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      text: "",
      image: "",
      errors: []
    };
  }
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

  onSubmit = async e => {
    e.preventDefault();
    console.log(this.state);
    try {
      let formData = new FormData();
      formData.append("title", this.state.title);
      formData.append("text", this.state.text);
      formData.append("image", this.state.image);
      console.log(formData);
      await axios.post("http://localhost:8080/api/blog/", formData, {
        "Content-Type": "multipart/form-data",
        headers: { Authorization: `Bearer ${this.props.authLocal.token}` }
      });
      this.props.history.push("/blogs");
    } catch (err) {
      console.log(err.response.data.message);
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
              <Jumbotron className="createPost">
                <Row>
                  <Col md={{ span: 4, offset: 4 }}>
                    <p className="createBlogTitle">
                      <FontAwesomeIcon
                        className="iconCreate fa-2x"
                        icon="edit"
                      />
                      Create Blog
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form onSubmit={this.onSubmit} className="createForm">
                      <Form.Group>
                        <Form.Control
                          className="title"
                          type="text"
                          name="title"
                          value={this.state.title}
                          onChange={this.handleInputChange}
                          placeholder="Blog Title"
                        />
                        <Form.Control
                          className="textarea"
                          as="textarea"
                          rows="6"
                          placeholder="Text"
                          name="text"
                          value={this.state.text}
                          onChange={this.handleInputChange}
                        />
                        <input
                          type="file"
                          name="image"
                          onChange={this.handleFileChange}
                        />
                        <br />
                        <p className="errors">{this.state.errors}</p>
                        <Button
                          type="submit"
                          className="createButton"
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

const mapStateToProps = state => {
  return {
    authLocal: state.auth
  };
};

export default connect(mapStateToProps)(requireAuth(CreateComponent));
