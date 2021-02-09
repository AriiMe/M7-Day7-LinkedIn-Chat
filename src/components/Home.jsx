/** @format */

import React, { Component } from "react";
import { Container, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";
import EditPost from "./EditPost";
import PostModal from "./PostModal";
import RSidebar from "./RSidebar";
import Sidebar from "./Sidebar";
import AppNavBar from "./AppNavBar";
import "../styles/Home.css";
import SinglePost from "./SinglePost";
import ChatPage from "./ChatPage";

export default class Home extends Component {
  state = {
    posts: [],
    me: {},
    showAlert: null,
    err: false,
    errType: null,
    errMsg: "",
    loading: true,
  };
  fetchPost = async () => {
    console.log("Bearer " + localStorage.getItem("token"));
    try {
      const response = await fetch(
        "https://linkedin-bw-clone.herokuapp.com/api/posts",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        let postResponse = await response.json();
        console.log(postResponse);
        postResponse = postResponse.reverse().slice(0, 50);
        this.setState({ posts: postResponse, loading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        err: true,
        errType: "danger",
        errMsg: error.messasge,
      });
    }
  };
  fecthLikes = async () => {
    try {
      const result = await fetch(
        "https://linkedin-bw-clone.herokuapp.com/api/"
      );
    } catch (e) {}
  };
  fetchMe = async () => {
    try {
      const meFetch = await fetch(
        "https://linkedin-bw-clone.herokuapp.com/api/profile/me",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const meResponse = await meFetch.json();
      console.log(meResponse);
      this.setState({ me: meResponse });
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.fetchPost();
    this.fetchMe();
  }
  render() {
    this.state.posts.length > 0
      ? console.log("render", this.state.posts[0].profile.imgurl)
      : console.log(" ");
    return (
      <div className="homeDiv">
        <Container className="HomeCont">
          {this.state.err && (
            <Alert variant="danger">{this.state.errMsg}</Alert>
          )}
          {
            this.state.loading && this.state.err !== true ? (
              <div
                style={{ position: "relative", top: "8vh", left: "25vw" }}
                className="lds-facebook"
              ></div>
            ) : Object.keys(this.state.posts).length !== 0 ? (
              <Row>
                <Col className="d-none d-lg-block" lg={3}>
                  <AppNavBar me={this.state.me} />
                  <RSidebar me={this.state.me} />
                </Col>
                <Col lg={6} md={9}>
                  <PostModal
                    refetch={() => this.fetchPost()}
                    me={this.state.me}
                  />
                  {this.state.posts.length > 0 &&
                    this.state.posts.map((post) => (
                      <SinglePost
                        post={post}
                        fetchPost={() => this.fetchPost()}
                        me={this.state.me}
                      />
                    ))}
                </Col>
                <Col className="d-none d-md-block" md={3}>
                  <Sidebar />
                </Col>
              </Row>
            ) : (
              <div></div>
            )
            /**: true,
              errType: "warning",
              errMsg: "We have encounter a problem, the profile is empty",
            }) **/
          }
        </Container>
      </div>
    );
  }
}
