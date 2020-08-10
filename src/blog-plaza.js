import React, { Component } from "react";
import "./App.css";
import ShowBlog from "./components/show-blog";
import NewBlog from "./components/new-blog";
import { Link } from 'react-router-dom';

class BlogPlaza extends Component {
  //   render() {
  //     return (
  //       <div className="App">
  //         <h1><p>Plaza</p></h1>

  //       </div>
  //     );
  //   }

  constructor(state) {
    super(state);
    this.state = {
      blogs: [],
      isLoggedIn: false,
      currentUser: null,
    };
  }

  componentWillMount() {
    // get the logged-in info
    let currentUser;
    if(currentUser = JSON.parse(window.localStorage.getItem("currentUser"))){ //logged in
      this.setState({currentUser: currentUser, isLoggedIn: true});
    }
    this.loadBlogs();
  }

  loadBlogs() {
    fetch("https://final-project-rubberducks.glitch.me/blog", {
      method: "GET",
      // By ZYC
      credentials: "include",
      // "Access-Control-Allow-Origin": "*",
      headers: {}
    })
      .then(res => {
        console.log(res);
        if (res.status === 401){
          this.setState({isLoggedIn: false});
          return [];
        }
        else if (res.status === 200){
          // this.setState({isLoggedIn: true});
          return res.json();
        }
      })
      .then(blogs =>
        this.setState(
          {
            blogs: blogs
          },
          () => console.log("blogs fetched... ", blogs)
        )
      );
    //res.json() is a Promise.
  }

  render() {
    let allBlogs;
    console.log(this.state);
    
    // if (this.state.isLoggedIn){
      allBlogs = this.state.blogs.map(blog => (
        <ShowBlog key={blog._id} blog={blog} currentUser={this.state.currentUser}></ShowBlog>
      ));
    // }
    
    console.log(this.state);
    
    const remindLoginInfo = this.state.isLoggedIn ? <h3></h3> : <h3>You may need to <Link to='/login'>log in</Link> first to post blogs.</h3>;

    return (
      //SIM: add margins to the page
      <div className="blog-plaza">
            {/* <div className="company-title"> */}
              <h3>Plaza</h3>
            {/* </div> */}

            <div>
              <NewBlog isLoggedIn={this.state.isLoggedIn} history={this.props.history} currentUser={this.state.currentUser}/>
            {remindLoginInfo}
            </div>
            <div className="companies-list">
              <div className="row">{allBlogs}</div>
            </div>
            <div>
              <div className="process-comm">
                <a href="#" title="">
                  <img src="images/process-icon.png" alt="" />
                </a>
              </div>
            </div>
      </div>
    );
  }
}

export default BlogPlaza;
