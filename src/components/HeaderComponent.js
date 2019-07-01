import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signout } from "../actions/auth";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class HeaderComponent extends React.Component {
  handleClick = e => {
    e.preventDefault();
    this.props.signout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  renderLinks() {
    if (this.props.auth) {
      return (
        <div>
          <Link to="/blogs" style={{ textDecoration: "none" }}>
            My Blogs
          </Link>

          <Link to="/create" style={{ textDecoration: "none" }}>
            Create Blog
          </Link>

          <Button
            onClick={this.handleClick}
            type="button"
            variant="link"
            className="signOutButton"
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              SignOut
            </Link>
          </Button>

          <span className="userName">
            {this.props.authUser.name}
            {localStorage.getItem("user")
              ? localStorage.getItem("user").replace(/['"]+/g, "")
              : ""}{" "}
          </span>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Register
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <Navbar expand="lg" className="header">
          <Navbar.Brand className="blog">Blog</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <div>
                <Link to="/" style={{ textDecoration: "none" }} color="inherit">
                  Home
                </Link>
              </div>
              {this.renderLinks()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.token,
    authUser: state.auth.user
  };
}

export default connect(
  mapStateToProps,
  { signout }
)(HeaderComponent);
