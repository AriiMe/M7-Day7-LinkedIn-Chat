import React, { Component } from "react";
import { Row } from "react-bootstrap";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import vid1 from "../assets/vid1.png";
import vid2 from "../assets/vid2.png";
import vid3 from "../assets/vid3.png";
class Sidebar extends Component {
  state = {
    users: [],
    selected: "me",
  };
  componentDidMount = () => {
    fetch("https://linkedin-bw-clone.herokuapp.com/api/profile", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("token"),
        ContentType: "application/json",
      }),
    })
      .then((response) => response.json())
      .then((info) => {
        this.setState({ profiles: info });
      });
  };
  render() {
    return (
      <>
        <div className="ad-div">
          <img
            className="ad"
            src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
            alt="Advertise on LinkedIn"
            border={0}
          />
        </div>
        <div className="usersDiv">
          <p className="divTitle">People also viewed</p>
          {this.state.profiles &&
            this.state.profiles.slice(0, 6).map((profile, index) => (
              <div className="profilediv2" key={`suggestprofiles${index}`}>
                <Link to={`/profile/${profile.id}`}>
                  <Row>
                    <img
                      className="userimg"
                      src={profile.imgurl}
                      alt="profile"
                    ></img>
                    <div>
                      <h6 className="sugusers" id={`suggestusers${index}name`}>
                        {profile.name}
                      </h6>
                      <small className="ranking">• 2nd</small>
                      <p className="usersp">{profile.title}</p>
                      <hr className="hrside" />
                    </div>
                  </Row>
                </Link>
              </div>
            ))}
        </div>
        <div className="lrn-div">
          <svg
            style={{ color: "#0A66C2" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 14"
            data-supported-dps="14x14"
            fill="currentColor"
            width="14"
            height="14"
            focusable="false"
          >
            <g>
              <path d="M14 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h12a1 1 0 011 1zM4 5H2v7h2zm.25-2A1.27 1.27 0 003 1.8 1.27 1.27 0 001.75 3 1.27 1.27 0 003 4.2 1.27 1.27 0 004.25 3zM12 8.29c0-2.2-.73-3.49-2.86-3.49A2.71 2.71 0 006.89 6V5H5v7h2V8.73A1.74 1.74 0 018.66 6.8C9.82 6.8 10 7.94 10 8.73V12h2z"></path>
            </g>
          </svg>
          <h6 className="lrn-h6">LEARNING</h6>
          <h5 className="lrn-h5">Add new skills with these courses</h5>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img className="vid-img" src={vid1} alt="banner"></img>
            </div>
            <div className="col-md-8">
              <h4 className="vid-txt">
                Building Angular and ASP.NET Core Applications
              </h4>
              <small className="vid-sml">3,895</small>
            </div>
            <div className="col-md-4">
              <img className="vid-img" src={vid2} alt="banner"></img>
            </div>
            <div className="col-md-8">
              <h4 className="vid-txt">
                Building Angular and ASP.NET Core Applications
              </h4>
              <small className="vid-sml">4,985</small>
            </div>
            <div className="col-md-4">
              <img className="vid-img" src={vid3} alt="banner"></img>
            </div>
            <div className="col-md-8">
              <h4 className="vid-txt">
                Building Angular and ASP.NET Core Applications
              </h4>
              <small className="vid-sml">12,464</small>
            </div>
          </div>
        </div>
        <div className="ad-div">
          <img
            className="ad"
            src="https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg"
            alt="Advertise on LinkedIn"
            border={0}
          />
        </div>
      </>
    );
  }
}

export default Sidebar;
