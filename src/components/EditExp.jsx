/** @format */

import React from "react";
// import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "../App.css";
import "../styles/Profile.css";
class Edit extends React.Component {
  state = {
    experience: this.props.exp,
    selectedFile: null,
    imgSubmitStatus: "secondary",
  };

  onChangeHandler = (e) => {
    this.setState({
      experience: {
        ...this.state.experience,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.exp !== this.props.exp) {
      this.setState({ experience: this.props.exp });
    }
  }

  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    });
  };

  fileUploadHandler = async () => {
    alert("ok");
    const fd = new FormData();
    fd.append("role", this.state.experience.role);
    fd.append("company", this.state.experience.company);
    fd.append("startdate", this.state.experience.startdate);
    fd.append("enddate", this.state.experience.enddate);
    fd.append("description", this.state.experience.description);
    fd.append("area", this.state.experience.area);
    fd.append("profileId", this.props.profileId);
    fd.append("ExpImage", this.state.selectedFile);
    let url =
      Object.keys(this.props.exp).length > 0
        ? `https://linkedin-bw-clone.herokuapp.com/api/exp/${this.props.exp.id}`
        : `https://linkedin-bw-clone.herokuapp.com/api/exp/${this.props.profileId}`;
    console.log(url, Object.keys(this.props.exp).length > 0);
    try {
      const response = await fetch(url, {
        method: Object.keys(this.props.exp).length > 0 ? "PUT" : "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: fd,
      });
      console.log(response);
      if (response.ok) {
        this.props.toggle({}, false);
        this.props.refetch();
      } else {
        this.props.toggle({}, false);
        this.props.refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log("edit exp", this.props);
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => this.props.toggle({}, false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Object.keys(this.props.exp).length > 0 ? "Edit" : "Add"} Experience
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role * </Form.Label>
              <Form.Control
                required
                id="role"
                value={this.state.experience.role}
                type="text"
                size="sm"
                placeholder="Role"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company * </Form.Label>
              <Form.Control
                required
                id="company"
                value={this.state.experience.company}
                type="text"
                size="sm"
                placeholder="Company"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start date * </Form.Label>
                  <Form.Control
                    required
                    id="startdate"
                    value={this.state.experience.startdate}
                    type="date"
                    size="sm"
                    placeholder="Headline"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>End date (empty if current) </Form.Label>
                  <Form.Control
                    value={this.state.experience.enddate}
                    id="enddate"
                    type="date"
                    size="sm"
                    placeholder="Current Position"
                    onChange={(e) => this.onChangeHandler(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Description * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.description}
                id="description"
                as="textarea"
                size="sm"
                placeholder="Description"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area * </Form.Label>
              <Form.Control
                required
                value={this.state.experience.area}
                id="area"
                type="text"
                size="sm"
                placeholder="Area"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {Object.keys(this.props.exp).length > 0 && (
            <Button
              className="rounded-pill py-1 mr-auto"
              variant="danger"
              onClick={() => this.actionBtn("DELETE")}
            >
              DELETE
            </Button>
          )}
          {/* <Button
            className="rounded-pill py-1"
            variant="secondary"
            onClick={this.props.toggle}
          >
            Close
          </Button> */}
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <Button
            className="rounded-pill py-1"
            variant={this.state.imgSubmitStatus}
            onClick={() => this.fileInput.click()}
          >
            {this.state.imgSubmitStatus === "secondary"
              ? "Choose an image"
              : "Ready to Upload"}
          </Button>
          <Button
            className="rounded-pill py-1"
            variant="primary"
            onClick={() => this.fileUploadHandler()}
          >
            {Object.keys(this.props.exp).length > 0 ? "Save Changes" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Edit;
