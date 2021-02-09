import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class RSidebar extends React.Component {
  state = {
    Me: [],
  };
  logout = () => {
    localStorage.setItem("token", "");
    this.props.history.push("/");
  };
  render() {
    return (
      <>
        <Card
          style={{ borderTopRightRadius: "8px", borderTopLeftRadius: "8px" }}
        >
          <Card.Img
            className="cardImg"
            variant="top"
            src="https://coverfiles.alphacoders.com/372/37275.jpg"
            style={{ objectFit: "cover" }}
            alt="placeholder"
          />
          <Card.Body>
            <div>
              <div style={{ marginTop: "-130px" }}>
                <img
                  src={this.props.me.imgurl}
                  alt="propic"
                  height="120px"
                  width="120px"
                  style={{
                    borderRadius: "50%",
                    border: "4px solid white",
                    objectFit: "cover",
                    width: "80px",
                    height: "80px",
                    marginTop: "50px",
                    marginLeft: "65px",
                  }}
                ></img>
              </div>
            </div>

            <Card.Text className="crdTxtH">
              <p className="wlcmP">
                {this.props.me.name + " " + this.props.me.surename}
              </p>
              <span className="text-muted text-center">
                {this.props.me.title}
              </span>
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem action>
              ⠀⠀⠀<span>Connections</span>{" "}
              <h6 style={{ marginLeft: "30px" }}>Grow your network</h6>
            </ListGroupItem>
            <ListGroupItem action>
              <svg
                style={{ paddingRight: "10px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                width="29"
                height="29"
                focusable="false"
              >
                <path
                  d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z"
                  fill="#f8c77e"
                ></path>
                <path
                  d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z"
                  fill="#e7a33e"
                ></path>
              </svg>
              See all Premium Features
            </ListGroupItem>
            <ListGroupItem action>
              <svg
                style={{ paddingRight: "10px" }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                data-supported-dps="16x16"
                fill="currentColor"
                width="29"
                height="29"
                focusable="false"
              >
                <path d="M12 1H4a1 1 0 00-1 1v13.64l5-3.36 5 3.36V2a1 1 0 00-1-1z"></path>
              </svg>
              My Items
            </ListGroupItem>
            <ListGroupItem action onClick={() => this.logout()}>
              <button className="logoutbtn">Logout</button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </>
    );
  }
}
export default withRouter(RSidebar);
