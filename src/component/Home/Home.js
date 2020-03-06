import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import "./Home.css";

export class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">

          <form>
            <h1 className="AppTitle">Spark Dating service</h1>
            <h3>Please register your profile.</h3>
            <Button variant="btn btn-success">Register Profile</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
