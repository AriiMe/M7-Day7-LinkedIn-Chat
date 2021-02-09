/** @format */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import io from "socket.io-client";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./Chat.css";
const connOpt = {
  transports: ["websocket"],
};

let socket = io("https://striveschool-api.herokuapp.com", connOpt);

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [username, setUsername] = useState("Pepega1");
  const [recipient, setRecipient] = useState("all users");
  const [message, setMessage] = useState("");
  const [globalChat, setGlobalChat] = useState([]);

  const getPast = async () => {
    let response = await fetch(
      "https://striveschool-api.herokuapp.com/api/messages/" + username
    );
    let resp = await response.json();
    console.log(resp);
    setAllMessages((allMessages) => allMessages.concat(resp));
  };

  useEffect(() => {
    socket.on("connect", () => console.log("connected to socket"));
    getPast();
    socket.on("list", (list) => setUsers(list));
    socket.emit("setUsername", { username: username });
    socket.on("bmsg", (msg) =>
      setGlobalChat((globalChat) => globalChat.concat(msg))
    );
    socket.on("chatmessage", (text) =>
      setAllMessages((allMessages) => allMessages.concat(text))
    );
  }, []);

  useEffect(() => {
    setCurrentMessages(allMessages.filter((msg) => msg.from === recipient));
  }, [recipient]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (recipient === "all users") {
      socket.emit("bmsg", {
        user: username,
        message: message,
      });
    } else {
      socket.emit("chatmessage", {
        text: message,
        to: recipient,
      });
    }
    setMessage("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={2} className="usersbox">
            <ul>
              <li id="users" onClick={() => setRecipient("all users")}>
                Users
              </li>
              {users.length > 0 &&
                users.map((user, index) => (
                  <li id="users" key={index} onClick={() => setRecipient(user)}>
                    <strong>{user}</strong>
                  </li>
                ))}
            </ul>
          </Col>
          <Col xs={6}>
            <div className="App">
              <ul id="messages">
                {recipient === "all users"
                  ? globalChat.map((message, index) => (
                      <li key={index}>
                        {console.log(message)}
                        <strong>{message.user}</strong> {message.message}
                      </li>
                    ))
                  : currentMessages.map((message, index) => (
                      <li key={index}>
                        {console.log(message)}
                        <strong>
                          {message.from} to {message.to}
                        </strong>{" "}
                        {message.msg}
                        {message.text}
                      </li>
                    ))}
              </ul>
              <form id="chat" onSubmit={sendMessage}>
                <input
                  autoComplete="off"
                  value={message}
                  onChange={(e) => setMessage(e.currentTarget.value)}
                />
                <Button type="submit" className="rounded">
                  Send
                </Button>
              </form>
            </div>
          </Col>
          {/* <Col className="d-none d-md-block position-fixed" xs={3}>
            <Sidebar />
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default ChatPage;
