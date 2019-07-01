import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      if (this.props.authLocal.token === null) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return {
      authLocal: state.auth
    };
  };
  return connect(mapStateToProps)(ComposedComponent);
};
