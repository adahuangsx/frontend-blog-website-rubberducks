import React, { Component } from "react";
import "./w3.css";
// import "./user.css";
import { ShowUser } from "./components/show-user";
import Login from "./components/log-in";

import "./App.css";

class DuckPlaza extends Component {
  constructor(state) {
    super(state);
    this.state = {
      protected: true,
      users: []
    };
  }

  componentWillMount() {
    // call the API /login, if successful, render, otherwise redirect
    // using react router

    fetch("https://final-project-rubberducks.glitch.me/user", {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.redirected === true) {
          // console.log(res);
          // fetch(res.url, {method: 'GET'});
          this.setState({ protected: true });
        } else {
          this.setState({ protected: false });
        }
        return res.json();
      })
      .then(users => {
        if (this.state.protected === false) {
          this.setState({ users: users });
        }
      });
  }

  // fetch(...)
  // .then((res) => res.json())
  // .then(blogs => this.setState({blogs: blogs}))

  render() {
    const allUsers = this.state.users.map(user => (
      <ShowUser className='w3-quarter' key={user._id} user={user}></ShowUser>
    ));

    console.log(this.state.protected);

    return this.state.protected ? (
      <div>
        <Login />
      </div>
    ) : (
      /*<div>Login Page !! But this should be "Login" component. Solved: "{ }".</div>*/
      <div>
        <div className="companies-info">
          <div className="container">
            <div className="company-title">
              <h3>All Users</h3>
            </div>
            <div className="user-list">
              <div className="w3-row-padding w3-third">{allUsers}</div>
            </div>
            <div>
              <div className="process-comm">
                <a href="#" title="">
                  <img src="images/process-icon.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DuckPlaza;