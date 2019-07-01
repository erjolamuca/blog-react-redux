import React from "react";
import { Link } from "react-router-dom";

const NotFoundPageComponent = () => (
  <div>
    <h1 className="notfoundComponent">
      404 - Page Not Found <Link to="/">Go home</Link>
    </h1>
  </div>
);

export default NotFoundPageComponent;
