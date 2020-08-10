import React, { Component } from "react";
// import '../css/style.css';
// import '../css/animate.css';
// import '../css/responsive.css';
// import '../js/script.js';
// import '../js/bootstrap.min.js';
import { Link } from "react-router-dom";
import "../App.css";
import "./user.css";
import "../w3.css";
//SIM delete button
//following window

//show a user card

class ShowUser extends Component {
  constructor(state) {
    super(state);
  }

  render() {
    // var trueLikeCount;
    // if(this.state.likeCount > 0){
    //   trueLikeCount = this.state.likeCount;
    // }else{
    //   trueLikeCount = '';
    // }
    const theUser = this.props.user;
    const link_via_userid = "/duck/" + theUser._id;

    // const following_num = theUser.following.length;
    theUser.following = theUser.following || []; //to make sure following is defined so that length can be visited.
    return (
      <div className="user-card">
        {/* <div className="row"> */}
        <img
          className="user-avatar w3-col s2"
          src={theUser.avatarURL}
          alt="ducks pict"
        />
        <div className="user-detail">
          <p className="w3-col s4" key={theUser._id}>
            <Link to={link_via_userid}>{theUser.nickname}</Link>
          </p>
          {/* </div> */}
          <div className="w3-row s1">
            <p>Description:{theUser.description}</p>
          </div>
          <div>
            <ul>
              <li>
                <Link to="#">Following:{theUser.following.length}</Link>
              </li>

              <li>Role:{theUser.admin == true ? "admin" : "user"}</li>
            </ul>
          </div>
          <Link to={link_via_userid}>View Profile</Link>
        </div>
      </div>
    );
  }

  handleLikeClick() {
    /*
      TASK 2
      Here's another big issue. When the like button is clicked, nothing but a log statement runs! 
      That can't be right. Write some code here to respond appropriately. When you're done here and
      have addressed the problem in render() above, you should see the like count increase by 1 every time
      you click the button.
    */
    //this.setState({likeCount: this.state.likeCount + 1, recentLikeTime: new Date()});
    // this.setState({likeCount: this.state.likeCount + 1, recentLikeTime: moment().format('hh:mm:ss mm-dd-yyyy')});
    //recentLikeTime: moment().format('hh:mm:ss mm-dd-yyyy')   Caused glitch fail. Why??
    console.log("Like clicked!");
  }

  // componentDidMount() {
  //   setInterval(() => this.setState({ recentLikeTime: new Date() }), 1000);
  // }
}

export { ShowUser };
