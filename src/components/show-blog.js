import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./blog.css";
import "../w3.css";
import ShowComment from "./show-comment";
//SIM   tags

//show a blog card

class ShowBlog extends Component {
  constructor(state) {
    super(state);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.state = { 
      likeCount: 0,
      // isLoggedIn: false,
      // currentUser: null,
      isMySelf: this.props.currentUser ? (this.props.blog.userId == this.props.currentUser._id)
                                      : false,
    };
    this.deleteClick = this.deleteClick.bind(this);
  }

  // componentWillMount() {
  //   // get the logged-in info
  //   let currentUser;
  //   if(currentUser = JSON.parse(window.localStorage.getItem("currentUser"))){ //logged in
  //     this.setState({currentUser: currentUser, isLoggedIn: true});
  //   }
  // }

  deleteClick(){
    console.log("delete!");
  }

  handleLikeClick() {
    console.log("Like clicked!");
    this.setState({ likeCount: this.state.likeCount + 1 });
  }

  render() {
    const tags = this.props.blog.tags.map(tag => (
      <li key={tag} className="tag w3-col s2">
        {tag}
      </li>
    ));
    const theBlog = this.props.blog;
    const allComments = theBlog.comments.map(comment => (
      <ShowComment key={comment._id} comment={comment}></ShowComment>
    ));
    //SIM:change the blog card style
    const link_via_userId = "/duck/" + this.props.blog.userId;
    const deleteBtn = this.isMySelf ? <button onClick={this.deleteClick}>Delete</button> : <div></div>;
    return (
      <div className="blog-area">
        <div>
          <div key={theBlog._id} className="blog-card">
            <div className="topbar">
              <div className="user-image">
                <img
                  src="https://cdn.glitch.com/84652ec2-b492-49e3-8631-54eb47d483c4%2Ficons8-rubber-duck-64.png?v=1587307337782"
                  alt="user-image"
                />
              </div>
              <div className="user-name">
                <Link
                  to={link_via_userId}
                  key={theBlog.userId}
                  className="view-more-pro"
                >
                  {theBlog.userId}({theBlog.nickname})
                </Link>
                <span>
                  <img
                    src="https://cdn.glitch.com/84652ec2-b492-49e3-8631-54eb47d483c4%2Fclock.png?v=1587308748020"
                    alt="clock"
                  />
                  {theBlog.date}
                </span>
              </div>
              {/* add a more option button here  */}
            </div>
            <h4>Title: {theBlog.title}</h4>
            <h4 className="blog-content">Content: {theBlog.content}</h4>
            {/* <h4>Post in {theBlog.Date}</h4> */}
            <div className="w3-row-padding">
              <ul>{tags}</ul>
            </div>
            {/* like button and comment number */}
            <div className="likes"> {this.state.likeCount} like(s)</div>
            <input
              className="like-button w3-button"
              type="button"
              value="Like"
              onClick={this.handleLikeClick}
            ></input>
            {deleteBtn}
            {/* Here should import the show-comment card*/}
            <div className="new-comment">
              <input
                type="text"
                required
                className="w3-input w3-border w3-round-large"
                minLength="2"
                onChange={this.handleCommentChange}
                placeholder="Add comment here"
                value={this.state.comment}
              ></input>
              <button type="submit" className="w3-button w3-amber">
                Comment
              </button>
            </div>
            <ul>{allComments}</ul>
          </div>
        </div>
      </div>
    );
  }
}
export default ShowBlog;
