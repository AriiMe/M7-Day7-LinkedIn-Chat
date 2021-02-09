import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaQuestionCircle } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import FooterLogo from "../footer_logo.svg";
import "../styles/Footer.css";
class footer extends React.Component {
  render() {
    return (
      <Container id="footer" fluid>
        <div className="footerContent">
          <hr className="my-5" />
          <li-icon
            type="linkedin-logo"
            size="21dp"
            color="brand"
            role="img"
            aria-label="LinkedIn"
          >
            <img src={FooterLogo} alt="logo" />
          </li-icon>
          <Row id="footer-col">
            <Col md={6}>
              <Row>
                <Col xs={4}>
                  <p>
                    About <br />
                    Commnunity Guidelines <br />
                    Privacy & Terms <br />
                    Sales Solutions <br />
                    Safety Center
                  </p>
                </Col>
                <Col xs={4}>
                  <p>
                    A Accessibility <br />
                    Careers <br />
                    Ad Choices <br />
                    Mobile <br />
                  </p>
                </Col>
                <Col xs={4}>
                  <p>
                    Talent Solutions <br />
                    Marketing Solutions <br />
                    Advertising <br />
                    Small Business <br />
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col xs={6}>
                  <Row className="mb-3 mt-1">
                    <IconContext.Provider
                      value={{
                        color: "#616160",
                        size: "24",
                      }}
                    >
                      <FaQuestionCircle />
                    </IconContext.Provider>
                    <div className="ml-2">
                      <h6>Questions?</h6>
                      <span>Visit our Help Center.</span>
                    </div>
                  </Row>
                  <Row>
                    <IconContext.Provider
                      value={{
                        color: "#616160",
                        size: "23",
                      }}
                    >
                      <BsFillGearFill />
                    </IconContext.Provider>
                    <div className="ml-2">
                      <h6>Manage your account and privacy</h6>
                      <span>Go to your Settings.</span>
                    </div>
                  </Row>
                </Col>
                <Col xs={6}>
                  <span>Select Language</span>
                  <Form.Group>
                    <Form.Control
                      variant="outline-secondary"
                      className="footerLang"
                      size="sm"
                      as="select"
                    >
                      <option>English</option>
                      <option>Klingon</option>
                      <option>Italian</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>
          <span>LinkedIn Corporation © 2020</span>
        </div>
      </Container>
    );
  }
}
export default footer;
