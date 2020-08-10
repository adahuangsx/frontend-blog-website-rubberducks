import React, { Component, useState, useEffect } from "react";
import "./App.css";
import "./w3.css";
import "./components/blog.css";
import "./components/user.css";
import { ShowUser } from "./components/show-user";
import ShowBlog from "./components/show-blog";

class PersonalPage extends Component {
  constructor(state) {
    super(state);
    this.state = {
      userid: {
        _id: state.match.params.userid //passed in thru :userid in URL
      },
      user: [],
      blogs: [],
      following: [],
      isLoggedIn: false,
      currentUser: null,
    };
    console.log(state.match.params.userid);
    this._isWillMountFinished = false;
  }

  componentWillMount() {

    // get the logged-in info
    let currentUser;
    if(currentUser = JSON.parse(window.localStorage.getItem("currentUser"))){ //logged in
      this.setState({currentUser: currentUser, isLoggedIn: true});
    }
    
    // get this.state.user
    this.loadUserByUserid(this.state.userid._id);
    // get this.state.blogs
    this.loadBlogs(this.state.userid._id);
    // get the.state.following
    this.state.user.following = this.state.user.following || [];
    this.setState({
      following: this.state.user.following.map(eachFollowingid =>
        this.loadUserByUserid(eachFollowingid)
      )
    });

    this._isWillMountFinished = true;
  }

  loadUserByUserid(useridPassedIn) {
    let theReturnUser = [];
    fetch(
      "https://final-project-rubberducks.glitch.me/user/" + useridPassedIn,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
      .then(res => res.json())
      .then(user => {
        this.setState({
          user: user
        });
        theReturnUser = user;
      });
    console.log(this.state.user);
    return theReturnUser;
  }

  loadBlogs(useridPassedIn) {
    fetch(
      "https://final-project-rubberducks.glitch.me/allblogs/" + useridPassedIn,
      {
        method: "GET"
      }
    )
      .then(res => res.json())
      .then(blogs =>
        this.setState({
          blogs: blogs
        })
      );
  }

  render() {
    if (this._isWillMountFinished === true) {
      const theUser = this.state.user;
      const allBlogsOfUser = this.state.blogs.map(blog => (
        <ShowBlog key={blog._id} blog={blog} currentUserid={this.state.currentUser._id}></ShowBlog>
      ));

      console.log(this.state);
      // theUser.following = theUser.following || [];
      const allFollowing = theUser.following.map(eachFollowing => (
        <ShowUser
          className="w3-row s4"
          key={eachFollowing._id}
          user={eachFollowing}
        />
      ));

      return (
        <div className="App w3-row-padding">
          <h1>
            <p>Personal Page</p>
          </h1>
          <div class="w3-quarter">
            <ShowUser className="" key={theUser._id} user={theUser} />
            {allFollowing}
          </div>
          <div class="w3-threequarter col">{allBlogsOfUser}</div>
        </div>
      );
    }
  }
}

// function PersonalInfo( match ) {
// }

export { PersonalPage };
// export { PersonalInfo };
