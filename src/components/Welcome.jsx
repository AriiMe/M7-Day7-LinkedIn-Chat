import "../styles/Welcome.css";
import React, { Component } from "react";

import { Row, Col, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterLogo from "../footer_logo.svg";
import "../styles/Login.css";
import Login from "./Login";
export default class Welcome extends Component {
  render() {
    return (
      <div>
        <div style={{ width: "100vw", height: "100vh" }}>
          <div className="boxNav">
            <Navbar
              style={{ width: "100% !important" }}
              className="d-flex justify-content-between"
            >
              <Navbar.Brand>
                <img
                  style={{ color: "#0A66C2" }}
                  alt="linkedin"
                  src={FooterLogo}
                  width="535"
                  height="33"
                />
              </Navbar.Brand>
              <button className="jnbtn1">Join now</button>
              <Link to="/login">
                <button className="btnSign">Sign in</button>
              </Link>
            </Navbar>
            <Row className="d-flex justify-content-between mx-5 px-5">
              <Col md={4} className="pl-5">
                <div className="ml-5" style={{ width: "330px" }}>
                  <Login dontShowLogo />
                </div>
              </Col>
              <Col lg={8} className="d-none d-lg-block">
                <img
                  alt="welcomeBG"
                  className="wlcmImg "
                  src="https://static-exp1.licdn.com/sc/h/3m4tgpbdz7gbldapvl63mrnxz"
                ></img>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
