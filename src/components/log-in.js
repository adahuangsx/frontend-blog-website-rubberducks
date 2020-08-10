import React, { Component } from "react";
import UserService from "../services/user-service";
import { Link } from "react-router-dom";
import "../w3.css";
import "./form.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      password: ""
    };

    this.submitClick = this.submitClick.bind(this);
    this.handleChangeUserid = this.handleUseridChange.bind(this);
    this.handleChangePassword = this.handlePasswordChange.bind(this);
    // this.userService = new UserService();
  }

  handleUseridChange(event) {
    this.setState({ _id: event.currentTarget.value });// By ZYC  _id, not userid
  }

  handlePasswordChange(event) {
    this.setState({ password: event.currentTarget.value });
  }

  submitClick(event) {
    const form = document.getElementById("log-in-form");
    if (form.checkValidity()) {
      event.preventDefault();

      const loginURL = "https://final-project-rubberducks.glitch.me/login";
      //title, content, userId, userName
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(this.state),
        // "Access-Control-Allow-Origin": "*"
      };
      fetch(loginURL, requestOptions)
        .then(res => {
          if (res.status === 200) { // success Log in
            this.props.history.push("/");
            return res.json();
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .then(loggedinUser => window.localStorage.setItem("currentUser", JSON.stringify(loggedinUser)))
        .catch(err => {
          console.error(err);
          alert("Error logging in please try again");
        });
      


    }
  }


  render() {
    return (
      <div>
        <div className="intro">
          <h5>Log into your account you created before!!</h5>
          <p className="subtitle">Sharing your colorful life!!</p>
        </div>
        <form className="form" id="log-in-form" onSubmit={this.submitClick}>
          <p>
            <label>User ID:</label>
            <input
              type="text"
              className="w3-input w3-border w3-round-large"
              id="userid"
              placeholder="Enter your user ID"
              value={this.state.userid}
              onChange={this.handleChangeUserid}
            />
          </p>
          <p>
            <label htmlFor="pwd">Password:(6 or more characters)</label>
            <input
              className="w3-input w3-border w3-round-large"
              id="pwd"
              placeholder="Enter password"
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </p>
          <button type="submit" className="w3-button w3-amber" value="log in">
            Submit
          </button>
        </form>
        <div className="outro">
          <h6>
            Don't have an account?<Link to="/signup">Sign Up</Link>
          </h6>
        </div>
      </div>
    );
  }
}

export default Login;
