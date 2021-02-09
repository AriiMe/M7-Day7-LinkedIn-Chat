import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import AppNavBar from "./components/AppNavBar";
import Footer from "./components/Footer";
import Profile from "./components/ProfileBody";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import AOS from "aos";

// import PostModal from "./components/PostModal";
import "bootstrap/dist/css/bootstrap.min.css";

import "aos/dist/aos.css";
import ChatPage from "./components/ChatPage";

class App extends React.Component {
  state = { searchQuery: "" };
  componentDidMount() {
    AOS.init({
      debounceDelay: 500,
      once: false,
      mirror: false,
    });
    AOS.refresh();
  }
  searchHandler = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  render() {
    return (
      <Router>
        <Route
          path={["/profile/:id", "/home", "/chat"]}
          render={() => (
            <AppNavBar
              query={this.state.query}
              searchHandler={this.searchHandler}
            />
          )}
        />
        <Route
          path={"/home"}
          exact
          render={(props) => <Home title="Homepage" {...props} />}
        />
        <Route
          path={"/profile/:id"}
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route path={"/"} exact render={() => <Welcome />} />
        <Route path={"/login"} render={() => <Login />} />
        <Route path={"/signup"} render={() => <SignUp />} />
        <Route path={"/chat"} exact render={() => <ChatPage />} />
        <Route path={["/profile/:id", "/home"]} component={Footer} />
      </Router>
    );
  }
}

export default App;
