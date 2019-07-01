import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class SinglePostComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      blog: null
    };
  }
  async componentDidMount() {
    const blog = await axios.get(
      `http://localhost:8080/api/blog/${this.props.match.params.id}`
    );
    //console.log(blog);
    this.setState({
      loading: false,
      blog: blog.data
    });

    // console.log(this.props.authLocal.user);
    // console.log(`"${this.state.blog.user.name}"`);
    // console.log(localStorage.getItem("user"));
  }
  onDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/blog/${this.state.blog._id}`,
        {
          headers: { Authorization: `Bearer ${this.props.authLocal.token}` }
        }
      );
      this.props.history.push("/blogs");
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div />
        ) : (
          <div>
            <Container>
              <img
                height="500"
                width="100%"
                src={`http://localhost:8080/uploads/posts/${
                  this.state.blog.image
                }`}
                alt={this.state.blog.title}
              />
              <Row className="containerSingle">
                <Col md={{ span: 10, offset: 1 }}>
                  <Card key={this.state.blog._id} className="singlePostCard">
                    <Card.Body>
                      <Card.Title className="singlePostTitle">
                        {this.state.blog.title}
                      </Card.Title>

                      <Card.Text className="singlePostText">
                        {this.state.blog.text}
                      </Card.Text>

                      {localStorage.getItem("user") ===
                      `"${this.state.blog.user.name}"` ? (
                        <div className="singlePostButtons">
                          <Link
                            to={`/blog/edit/${this.state.blog._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button className="buttonShowSingle">Edit</Button>
                          </Link>
                          <Button
                            onClick={this.onDelete}
                            className="buttonDelete"
                          >
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <div />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authLocal: state.auth
  };
};
export default connect(mapStateToProps)(SinglePostComponent);
