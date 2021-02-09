/** @format */

import React from "react";
import { Container, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { BiLike, BiCommentDetail, BiShare, BiSend } from "react-icons/bi";

import moment from "moment";

import EditPost from "./EditPost";

export default class SinglePost extends React.Component {
  state = {
    likes: 0,
    isliked: false,
    comments: [],
    errorMessege: false,
  };
  getComments = async () => {
    try {
      let response = await fetch(
        "https://linkedin-bw-clone.herokuapp.com/api/comments/",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();

        this.setState({ comments });
      } else {
        this.setState({ errorMessage: true });
      }
    } catch (e) {
      this.setState({ errorMessage: true });
    }
  };
  handleDelete = async (e) => {
    let id = e.currentTarget.id;
    try {
      let response = await fetch(
        `https://linkedin-bw-clone.herokuapp.com/api/comments/${id}`,
        {
          method: "DELETE",
          headers: new Headers({
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          }),
        }
      );

      if (response.ok) {
        let filteredComments = this.state.comments.filter(
          (comment) => comment.id !== id
        );
        this.setState({
          comments: filteredComments,

          deletedSize: this.state.deletedSize + 1,
        });
      } else {
        alert("something went wrong :(");
      }
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: true });
    }
  };
  fetchLikes = async () => {
    try {
      const result = await fetch(
        `https://linkedin-bw-clone.herokuapp.com/api/like/${this.props.me.id}/${this.props.post.id}/posts`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const response = await result.json();
      console.log(response);
      this.setState({ likes: response.total, isLiked: response.isLiked });
    } catch (error) {
      console.log(error);
    }
  };
  handleLike = async () => {
    try {
      const result = await fetch(
        `https://linkedin-bw-clone.herokuapp.com/api/like/${this.props.me.id}/${this.props.post.id}`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const response = await result.json();
      console.log(response);
      await this.fetchLikes();
    } catch (error) {
      await this.fetchLikes();
      console.log(error);
    }
  };
  componentDidMount = async () => {
    console.log(this.props.me);
    await this.fetchLikes();
    await this.getComments();
  };

  render() {
    const { post, fetchPost, me } = this.props;
    console.log("me", me);
    return (
      <Card
        data-aos="zoom-in-up"
        data-aos-offset="500"
        data-aos-duration="5000"
        className="w-100 my-4"
        key={`feed${post.id}`}
      >
        <Card.Header className="d-flex justify-content-between px-3">
          <div>
            <img
              src={post.profile.imgurl}
              className="postModalImg mr-3"
              style={{ borderRadius: "100px" }}
            />
            {post.profile.name + " " + post.profile.surename}
          </div>
          {me.id === post.profileId && (
            <EditPost post={post} refetch={() => fetchPost()} me={me} />
          )}
        </Card.Header>
        {post.imgurl && (
          <Card.Img src={post.imgurl} alt="Postimgurl" className="postimgurl" />
        )}
        <span style={{ padding: "10px" }} className="text-muted text-right">
          {moment(post.createdAt).fromNow()}
        </span>
        <Card.Text className="p-3">{post.text}</Card.Text>
        <Card.Footer className="HomeModal bg-white">
          <Button
            variant={
              !this.state.isLiked ? "outline-dark mx-1" : "outline-success mx-1"
            }
            onClick={() => this.handleLike()}
          >
            <BiLike /> Like {this.state.likes}
          </Button>
          <Button variant="outline-dark mx-1">
            <BiCommentDetail /> Comment
          </Button>
          <Button variant="outline-dark mx-1">
            <BiShare /> Share
          </Button>
          <Button variant="outline-dark mx-1">
            <BiSend /> Send
          </Button>
        </Card.Footer>
      </Card>
    );
  }
}
