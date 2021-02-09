/** @format */

import React from "react";
import Edit from "./EditExp";
import { Button, Card, Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import Job from "../assets/job.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Route } from "react-router-dom";
import moment from "moment";
// import "../styles/Profile.css";
import "../styles/Experience.css";
class Experience extends React.Component {
  state = {
    showModal: false,
    experiences: [],
    selectedId: null,
    // method: null,
    exp: {},
    profile: {},
  };
  // re-order
  grid = 8;

  getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    profileSelect: "none",
    padding: this.grid * 2,
    margin: `0 0 ${this.grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.experience,
      result.source.index,
      result.destination.index
    );

    this.setState({
      experiences: items,
    });
  };
  getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: this.grid,
    width: 250,
  });

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  getCSV = async () => {
    const response = await fetch(
      `https://linkedin-bw-clone.herokuapp.com/api/exp/${this.props.profile.id}/downloadcsv`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    let blob = await response.blob();
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.setAttribute(
      "download",
      `${this.props.profile.username}=experiences_csv.csv`
    );
    document.body.appendChild(a);
    a.click();
  };
  searchExp = async () => {
    await fetch(
      `https://linkedin-bw-clone.herokuapp.com/api/exp/${this.props.profile.id}/exp`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((experience) => {
        this.setState({ experiences: experience });
      });
  };

  componentDidMount = () => {
    this.searchExp();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.profile.id !== this.props.profile.id) {
      this.searchExp();
    }
  };
  toggleModal = (experience, show) => {
    this.setState({
      showModal: show,
      exp: experience,
    });
  };

  render() {
    console.log("in experience", this.state);
    return (
      <>
        <Card className="bio cardProf">
          <Card.Body>
            <Row className="d-flex justify-content-between ml-1">
              <div id="expTitle" className="info">
                Experience
              </div>

              <Route path="/profile/me">
                <Button
                  variant="white"
                  onClick={() => this.toggleModal({}, true)}
                >
                  <IconContext.Provider
                    value={{
                      size: "24px",
                      className: "expIcons",
                      color: "#0A66CE",
                    }}
                  >
                    <BsPlus />
                  </IconContext.Provider>
                </Button>
              </Route>
            </Row>
            {/* <Edit /> */}
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {this.state.experiences.map((experience, index) => (
                      <Draggable
                        key={experience.id}
                        draggableId={experience.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Row noGutters>
                              <div style={{ width: "48px" }}>
                                <img
                                  src={
                                    experience.imgurl ? experience.imgurl : Job
                                  }
                                  style={{ width: "48px" }}
                                  alt="expimg"
                                />
                              </div>
                              <Col>
                                <ul
                                  id={experience.id}
                                  key={`exp${index}`}
                                  className="exp"
                                >
                                  <Route path="/profile/me">
                                    <Button
                                      variant="white"
                                      className="editBtnExp"
                                      onClick={() =>
                                        this.toggleModal(experience, true)
                                      }
                                    >
                                      <IconContext.Provider
                                        value={{
                                          size: "24px",
                                          className: "expIcons",
                                          color: "#0A66CE",
                                        }}
                                      >
                                        <BiPencil />
                                      </IconContext.Provider>
                                    </Button>
                                  </Route>
                                  <li className="expEntries">
                                    <div className="roleExp">
                                      {experience.role}
                                    </div>
                                  </li>
                                  <li className="expEntries">
                                    <div className="workplaceExp">
                                      {experience.company}
                                    </div>
                                  </li>
                                  <li className="expEntries">
                                    <div className="timeExp">
                                      {moment(experience.startDate).format(
                                        "MM/YYYY"
                                      )}{" "}
                                      -{" "}
                                      {experience.endDate
                                        ? moment(experience.endDate).format(
                                            "MM/YYYY"
                                          )
                                        : "Current"}
                                    </div>
                                    <div className="timeExp"></div>
                                  </li>

                                  <li className="expEntries">
                                    <div class="cityExp">{experience.area}</div>
                                  </li>
                                  <li className="expEntries">
                                    <div className="descExp">
                                      {experience.description}
                                    </div>
                                  </li>
                                </ul>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Card.Body>
        </Card>{" "}
        <Edit
          exp={this.state.exp}
          show={this.state.showModal}
          profileId={this.props.profile.id}
          toggle={this.toggleModal}
          refetch={() => this.searchExp()}
          color="#0A66CE"
        />
        <Button onClick={() => this.getCSV()}>download csv</Button>
      </>
    );
  }
}
export default Experience;
