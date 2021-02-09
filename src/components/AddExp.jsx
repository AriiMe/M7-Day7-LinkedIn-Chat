import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Button, Modal, Form } from "react-bootstrap";

class Add extends React.Component {
  state = {
    loading: true,
    experience: {
      role: "",
      company: "",
      startdate: "",
      enddate: "",
      description: "",
      area: "",
    },
  };
  submitExperience = async (e) => {
    try {
      const response = await fetch(
        "https://linkedin-bw-clone.herokuapp.com/api/profile/" + id,
        {
          method: "POST",
          body: JSON.stringify(this.state.experience),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateState = (e) => {
    let exp = { ...this.state.experience }; // creating a copy of the current state
    let currentId = e.currentTarget.id; // 'name', 'phone', etc.
    exp[currentId] = e.currentTarget.value; // e.currentTarget.value is the keystroke
    this.setState({ experience: exp }, console.log(this.state));
  };

  render() {
    return (
      <Modal
        show={this.props.open}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={this.props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add intro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role * </Form.Label>
              <Form.Control
                id="role"
                required
                onChange={this.updateState}
                value={this.state.experience.role}
                type="text"
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company * </Form.Label>
              <Form.Control
                id="company"
                required
                onChange={this.updateState}
                value={this.state.experience.company}
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start date * </Form.Label>
              <Form.Control
                id="startDate"
                required
                onChange={this.updateState}
                value={this.state.experience.startDate}
                type="date"
                placeholder="Headline"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End date (empty if current) </Form.Label>
              <Form.Control
                id="endDate"
                onChange={this.updateState}
                value={this.state.experience.endDate}
                type="date"
                placeholder="Current Position"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description * </Form.Label>
              <Form.Control
                id="description"
                required
                onChange={this.updateState}
                value={this.state.experience.description}
                as="textarea"
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area * </Form.Label>
              <Form.Control
                id="area"
                required
                onChange={this.updateState}
                value={this.state.experience.area}
                type="text"
                placeholder="Area"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClick}>
            Close
          </Button>
          <Button variant="primary" onClick={this.submitExperience}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default Add;
