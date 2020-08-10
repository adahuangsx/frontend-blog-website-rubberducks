import React, { Component } from "react";
import "./blog.css";
// import BlogService from "../services/blog-service";
import { useHistory } from "react-router-dom";
// import { TweetsService } from '../services/tweets-service';

class NewBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      tags: [],
      isLoggedIn: false,
      currentUser: null
    };

    // bind event handlers to access "this"
    // this.postBlog = this.postBlog.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);

    // this.blogService = new BlogService();
  }

  componentWillMount() {
    // get the logged-in info
    let currentUser;
    if (
      (currentUser = JSON.parse(window.localStorage.getItem("currentUser")))
    ) {
      //logged in
      this.setState({ currentUser: currentUser, isLoggedIn: true });
    }
    console.log(this.props.currentUser);
    
  }

  submitClick(event) {
    if (this.state.currentUser == null) {
      alert("Please log in!");
    } else {
      event.preventDefault();

      // this.tweetsService.postTweet({ text: this.state.text, author: this.state.author });
      // const postNewBlogReturn =
      const postBlogParams = {
        title: this.state.title,
        content: this.state.content,
        tags: this.state.tags,
        userId: this.props.currentUser._id,
        nickname: this.props.currentUser.nickname
      };
      console.log(postBlogParams);
      
      const requestOptions = {
        method: "POST",
        "Access-Control-Allow-Origin": "*",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postBlogParams)
      };
      fetch(
        "https://final-project-rubberducks.glitch.me/blog",
        requestOptions
      ).then(res => {
        if (res.status === 201) {
          this.props.history.push("/"); //problematic
          return res.json();
        } else {
          const error = new Error(res.error);
          throw error;
        }
      });
    }
  }

  render() {
    return (
      <div className="new-blog-component">
        <p className="introduction">Sharing your colorful life!!</p>
        <form id="new-blog-form" onSubmit={this.submitClick}>
          <input
            type="text"
            required
            className="w3-input w3-border w3-round-large"
            minLength="2"
            onChange={this.handleTitleChange}
            placeholder="What is your title?"
            value={this.state.title}
          ></input>
          <textarea
            className="new-blog-content"
            rows="4"
            required
            className="w3-input w3-border w3-round-large"
            minLength="6"
            onChange={this.handleContentChange}
            placeholder="What's on your mind?"
            value={this.state.content}
          ></textarea>
          <input
            type="text"
            className="new-blog-tags"
            rows="6"
            className="w3-input w3-border w3-round-large"
            onChange={this.handleTagsChange}
            placeholder="use comma ', ' as seg"
            value={this.state.tags}
          ></input>

          <button type="submit" className="w3-button w3-amber">
            {" "}
            Post your blog!!
          </button>
        </form>
        {/* 2 seconds notice */}
        {this.state.isNewBlogPosted && <p>Your blog has been posted!</p>}
      </div>
    );
  }

  handleTitleChange(event) {
    this.setState({ title: event.currentTarget.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.currentTarget.value });
  }
  handleTagsChange(event) {
    const tags = event.currentTarget.value.split(",");
    this.setState({ tags: tags });
  }
}

export default NewBlog;
