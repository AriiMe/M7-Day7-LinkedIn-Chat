/** @format */

import React from "react";
import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "../styles/PostModal.css";

class EditPost extends React.Component {
  state = {
    showModal: false,
    content: [],
    post: {},
    selectedFile: null,
    imgSubmitStatus: "secondary",
  };

  onChangeHandler = (e) => {
    this.setState({
      content: {
        ...this.state.content,
        [e.target.id]: e.currentTarget.value,
      },
    });
  };

  Edit = async () => {
    try {
      const response = await fetch(
        `https://linkedin-bw-clone.herokuapp.com/api/Posts/${this.props.post.id}`,
        {
          method: "PUT",
          body: JSON.stringify(this.state.content),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        this.state.selectedFile !== null
          ? this.fileUploadHandler()
          : this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
      this.props.refetch();
    } catch (e) {
      console.log(e);
    }
  };

  Delete = async () => {
    try {
      const response = await fetch(
        `https://linkedin-bw-clone.herokuapp.com/api/Posts/${this.props.post.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        this.setState({ showModal: false });
        this.props.refetch();
      } else {
        this.setState({ showModal: false });
      }
    } catch (e) {
      console.log(e);
    }
  };
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      imgSubmitStatus: "success",
    });
  };

  fileUploadHandler = async () => {
    const fd = new FormData();
    fd.append("post", this.state.selectedFile);
    try {
      const response = await fetch(
        `https://linkedin-bw-clone.herokuapp.com/api/Posts/${this.props.post.id}`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          body: fd,
        }
      );
      if (response.ok) {
        this.setState({ showModal: false }, () => this.props.refetch());
      } else {
        this.setState({ showModal: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    this.setState({ content: this.props.post });
  };
  render() {
    return (
      <>
        <div
          onClick={() => this.setState({ showModal: true })}
          className="JumbBiPencilDiv"
        >
          <IconContext.Provider
            value={{
              size: "24",
              className: "JumbBiPencil",
            }}
          >
            <BiDotsHorizontalRounded />
          </IconContext.Provider>
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit a Post</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col>
                <img
                  src={this.props.post.profile.imgurl}
                  className="postModalImg"
                  alt="profpic"
                />
                <strong className="ml-5">
                  {this.props.post.profile.name +
                    " " +
                    this.props.post.profile.surename}
                </strong>
              </Col>
            </Row>
            <Form className="mt-2">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  id="text"
                  rows={3}
                  value={this.state.content.text}
                  onChange={(e) => this.onChangeHandler(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <Button
              variant={this.state.imgSubmitStatus}
              onClick={() => this.fileInput.click()}
            >
              {this.state.imgSubmitStatus === "secondary"
                ? "Choose an image"
                : "Ready to Upload"}
            </Button>
            {this.props.post.profileId === this.props.me.id && (
              <Button variant="danger" onClick={() => this.Delete()}>
                Delete
              </Button>
            )}
            <Button variant="primary" onClick={() => this.Edit()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditPost;
