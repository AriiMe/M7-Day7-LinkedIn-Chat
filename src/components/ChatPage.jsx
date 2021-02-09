/** @format */

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import io from "socket.io-client";
import {
  Modal,
  InputGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./Chat.css";
const connOpt = {
  transports: ["websocket", "polling"],
};

let socket = io("https://striveschool.herokuapp.com/", connOpt);

function ChatPage() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [username, setUsername] = useState("Pepega1");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const getHistory = async () => {
    let response = await fetch(
      "https://striveschool-api.herokuapp.com/api/messages/" + username
    );
    let resp = await response.json();
    console.log(resp);
    setAllMessages((allMessages) => allMessages.concat(resp));
  };
  useEffect(() => {
    socket.on("connect", () => console.log("connected to socket"));
    getHistory();
    socket.on("list", (list) => setUsers(list));
    socket.emit("setUsername", { username: username });
    socket.on("chatmessage", (text) =>
      setMessages((messages) => messages.concat(text))
    );
  }, []);
  const handleMessage = (e) => {
    setMessage(e.currentTarget.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("chatmessage", {
      text: message,
      to: recipient,
    });
    setMessage("");
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={2} className="usersbox">
            <ul id="users">
              {users.length > 0 &&
                users.map((user, index) => (
                  <li key={index} onClick={() => setRecipient(user)}>
                    <strong>{user}</strong>
                  </li>
                ))}
            </ul>
          </Col>
          <Col xs={6}>
            <div className="App fixed-bottom">
              <ul id="messages">
                {messages.map((msg, i) => (
                  <li
                    key={i}
                    className={msg.user === username ? "ownMessage" : "message"}
                  >
                    <strong>{msg.user}</strong> {msg.message}
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
