import React from "react";
//import pagenotfound image
import pagenotfoundImage from "../images/pagenotfound.jpg";
//react router dom
import { BrowserRouter as Router, Switch } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Router>
      <Switch>
        <div
          className="pageNotFound"
          style={{ textAlign: "center", padding: "50px 0" }}
        >
          <h1>Oops..! 404 Page Not Found</h1>
          <p>Looks like you came to wrong page on our server</p>
          <img
            src={pagenotfoundImage}
            height="500"
            width="500"
            alt="not found"
          />
        </div>
      </Switch>
    </Router>
  );
};

export default PageNotFound;
