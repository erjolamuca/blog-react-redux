import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class WelcomeComponent extends Component {
  state = {
    blogs: []
  };

  async componentDidMount() {
    const results = await axios.get("http://localhost:8080/api/blog");
    this.setState({
      blogs: results.data
    });
  }

  render() {
    return (
      <div>
        <div className="parallaxWelcomeComponent" />
        <Container className="containerWelcomeComponent">
          <Row className="containerRow">
            <p className="quoteWelcomeComponent">
              "If You write a story, it may be bad; If you write a hundred, you
              have the odds in your favor." Edgar Rice Burroughs"
            </p>
          </Row>
          <Row className="containerRow">
            {this.state.blogs.map(blog => {
              return (
                <Col key={blog._id} md={4}>
                  <Card key={blog._id} className="cardWelcomeComponent">
                    <Card.Img
                      height="200"
                      src={`http://localhost:8080/uploads/posts/${blog.image}`}
                    />
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>
                        {blog.text.substring(0, 150) + "..."}
                      </Card.Text>
                      <p className="blogUserName">
                        By:{" "}
                        <span>
                          {" "}
                          <FontAwesomeIcon icon="user-alt" /> {blog.user.name}
                        </span>
                      </p>
                      <Link
                        to={`/blog/show/${blog._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Continue Reading
                      </Link>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default WelcomeComponent;
