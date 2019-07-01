import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import SignUpComponent from "../components/SignUpComponent";
import NotFoundPageComponent from "../components/NotFoundPageComponent";
import HeaderComponent from "../components/HeaderComponent";
import WelcomeComponent from "../components/WelcomeComponent";
import MyBlogsComponent from "../components/MyBlogsComponent";
import SinglePostComponent from "../components/SinglePostComponent";
import EditCompinent from "../components/EditComponent";
import CreateComponent from "../components/CreateComponent";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <HeaderComponent />
      <Switch>
        <Route path="/" component={WelcomeComponent} exact={true} />
        <Route path="/blogs" component={MyBlogsComponent} exact={true} />
        <Route path="/login" component={LoginComponent} exact={true} />
        <Route path="/signup" component={SignUpComponent} exact={true} />
        <Route
          path="/blog/show/:id"
          component={SinglePostComponent}
          exact={true}
        />
        <Route path="/blog/edit/:id" component={EditCompinent} exact={true} />
        <Route path="/create" component={CreateComponent} exact={true} />
        <Route component={NotFoundPageComponent} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
