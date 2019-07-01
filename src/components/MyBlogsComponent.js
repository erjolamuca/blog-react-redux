import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import requireAuth from "./requireAuth";
import { Link } from "react-router-dom";

class MyBlogsComponent extends Component {
  constructor() {
    super();

    this.state = {
      blogs: []
    };
  }
  async componentDidMount() {
    if (this.props.authLocal.token !== null) {
      const results = await axios.get(
        "http://localhost:8080/api/blog/myposts",
        {
          headers: { Authorization: `Bearer ${this.props.authLocal.token}` }
        }
      );

      this.setState({
        blogs: results.data
      });
    }
  }
  render() {
    return (
      <div>
        <Container className="myBlogsContainer">
          <Row>
            {this.state.blogs.map(blog => {
              return (
                <Col md={4} key={blog._id}>
                  <Card key={blog._id}>
                    <Card.Img
                      height="200"
                      src={`http://localhost:8080/uploads/posts/${blog.image}`}
                    />

                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text>
                        {blog.text.substring(0, 150) + "..."}
                      </Card.Text>

                      <Link
                        to={`/blog/show/${blog._id}`}
                        style={{ textDecoration: "none" }}
                        className="buttonShow"
                      >
                        Show
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
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

export default connect(mapStateToProps)(requireAuth(MyBlogsComponent));
