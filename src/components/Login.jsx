/** @format */

import React, { Component } from "react";
import { Row, Col, Form, Button, Container, Badge } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import FooterLogo from "../footer_logo.svg";
import "../styles/Login.css";
class Login extends Component {
  state = {
    username: [],
    hidden: true,
  };
  url = "https://linkedin-bw-clone.herokuapp.com/api/profile/login";
  submitData = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(this.state.username),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const access_token = await response.json();
        console.log(access_token);
        localStorage.setItem("token", access_token.accessToken);
        this.props.history.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      username: {
        ...this.state.username,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };
  handleLogin = (e) => {
    if (e.keyCode === 13) {
      this.props.submitData(this.state.username);
    } else {
      this.setState({
        username: {
          ...this.state.username,
          [e.target.id]: e.currentTarget.value,
        },
      });
    }
  };
  toggleShow = (e) => {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    return (
      <div className="loginDiv">
        <Container>
          <Col className="loginCol mt-5">
            {!this.props.dontShowLogo && (
              <img
                src={FooterLogo}
                className="mb-4 "
                alt="loginLogo"
                style={{ height: "30px" }}
              />
            )}
            <div className={this.props.dontShowLogo ? "" : "shadowBox"}>
              <div className="mb-3">
                {this.props.dontShowLogo ? (
                  <h1 className="wlcT">
                    Welcome to your professional community
                  </h1>
                ) : (
                  <h2>Sign in</h2>
                )}
                {this.props.dontShowLogo ? (
                  ""
                ) : (
                  <span>Stay updated on your professional world</span>
                )}
              </div>
              <Form onSubmit={this.submitData}>
                <Form.Group>
                  <Form.Control
                    required
                    id="username"
                    value={this.state.username.username}
                    type="text"
                    size="lg"
                    placeholder="Email or Phone"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group className="inputPwd">
                  <Form.Control
                    required
                    id="password"
                    value={this.state.username.password}
                    type={this.state.hidden ? "password" : "text"}
                    size="lg"
                    placeholder="Password"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />

                  <Badge
                    pill
                    className="inputToggle"
                    onClick={(e) => this.toggleShow(e)}
                  >
                    {this.state.hidden ? "show" : "hide"}
                  </Badge>
                </Form.Group>
                <Col className="loginCol">
                  <Button type="submit" className="loginBtn">
                    Sign in
                  </Button>
                </Col>
              </Form>
              <a className="forgetPwd">Forget your password?</a>
            </div>
            {this.props.dontShowLogo ? (
              ""
            ) : (
              <Row className="d-flex justify-content-around mt-5 mx-auto bg-transparent">
                New to LinkedIn?{" "}
                <Link className="ml-1" to="/signup">
                  Join now
                </Link>
              </Row>
            )}
          </Col>
        </Container>
      </div>
    );
  }
}
export default withRouter(Login);
