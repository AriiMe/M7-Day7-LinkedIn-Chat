import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Card, Row } from "react-bootstrap";
import EditPage from "./EditPage";
import "../styles/Profile.css";
import { Route } from "react-router-dom";

class Bio extends React.Component {
  render() {
    return (
      <Card
        className="bio cardProf"
        style={{ borderRadius: ".5vw", marginTop: ".8vw" }}
      >
        <Card.Body>
          <Row className="d-flex justify-content-between ml-1">
            <div className="info">About</div>

            <Route path="/profile">
              {" "}
              <EditPage
                profile={this.props.profile}
                refetch={this.props.refetch}
                color="#0A66CE"
              />
            </Route>
          </Row>

          <div className="infobody">{this.props.bio}</div>
        </Card.Body>
      </Card>
    );
  }
}
export default Bio;
