import React, { Component } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterLogo from "../footer_logo.svg";
import "../styles/SignUp.css";
export default class SignUp extends Component {
  state = {
    user: [],
    hidden: true,
  };
  url = "https://linkedin-bw-clone.herokuapp.com/api/profile";
  header = {
    ContentType: "application/json",
  };
  submitData = async () => {
    try {
      let payload = this.state.user;
      // payload.password = btoa(payload.password);
      // payload.username = btoa(payload.username);
      let response = await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(payload),
        header: this.header,
      });
      if (response.ok) {
        console.log(response);
        console.log("response", await response.json());
        this.props.history.details.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      user: { ...this.state.user, [e.target.id]: e.currentTarget.value },
    });
  };
  handleLogin = (e) => {
    if (e.keyCode === 13) {
      this.submitData(this.state.user);
    } else {
      this.setState({
        user: {
          ...this.state.user,
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
      <div className="signupDiv">
        <Container className="d-flex flex-column justify-content-center align-content-center">
          <Col className="d-flex justify-content-center mx-auto mt-4 flex-column text-center">
            <img
              src={FooterLogo}
              className="mb-4"
              alt="logo"
              style={{ height: "30px" }}
            />
            <h3>Make the most of your professional life</h3>
          </Col>
          <Col className="signupCol mt-5 signupBox">
            <div className="bg-white d-flex flex-column ">
              <Form>
                <Form.Group>
                  <Form.Label>username</Form.Label>
                  <Form.Control
                    required
                    id="username"
                    value={this.state.user.username}
                    type="text"
                    size="sm"
                    placeholder="Email or Phone"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
                <Form.Group className="inputPwd">
                  <Form.Label>Password (6 or more characters)</Form.Label>
                  <Form.Control
                    required
                    id="password"
                    value={this.state.user.password}
                    type={this.state.hidden ? "password" : "text"}
                    size="sm"
                    placeholder="Password"
                    onKeyDown={(e) => this.handleLogin(e)}
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Form>
              <span>
                By clicking Agree & Join, you agree to the LinkedIn{" "}
                <a>user Agreement</a>, <a>Privacy Policy</a>, and{" "}
                <a>Cookie Policy</a>.
              </span>
              <Col className="signupCol px-0">
                {/* <Button className="signupBtn" onClick={() => this.submitData()}> */}
                <Button className="signupBtn">Agree & Join</Button>
              </Col>
            </div>
            <Row className="d-flex justify-content-around mt-4 mx-auto ">
              Already on LinkedIn?{" "}
              <Link className="ml-1" to="/login">
                {" "}
                Sign in
              </Link>
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}
