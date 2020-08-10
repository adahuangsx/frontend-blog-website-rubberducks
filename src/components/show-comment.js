import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./blog.css";
import "../w3.css";
// import '../css/style.css';
// import '../css/animate.css';
// import '../css/responsive.css';
// import '../js/script.js';
// import '../js/bootstrap.min.js';
//SIM
//show a comment small card

class ShowComment extends Component {
  constructor(state) {
    super(state);
    // this.state({
    //   userName: '',
    // userId: '',
    // createdTime:  { type: Date, default: Date.now },
    // content: ''
    // });
  }

  render() {
    const theComment = this.props.comment;
    const link_via_userid = "/duck/" + theComment.userId; // hard code

    return (
      <div>
        <div key={theComment._id} className="comment-card">
          <div className="user-name">
            <Link
              to={link_via_userid}
              key={theComment.userid}
              className="view-more-pro"
            >
              {theComment.userId}
              
            </Link>
            {/* here 1111 is for testing!  --by sichen */}
          </div>
          <span className="commentdate">
            <img
              src="https://cdn.glitch.com/84652ec2-b492-49e3-8631-54eb47d483c4%2Fclock.png?v=1587308748020"
              alt="clock"
            />
            {theComment.date}
          </span>
          <h4 className="blog-content">{theComment.content}</h4>
          
          <div className="w3-row-padding"></div> 
          <div></div>
        </div>
      </div>
    );
  }

  handleLikeClick() {
    console.log("Like clicked!");
  }
}

export default ShowComment;
