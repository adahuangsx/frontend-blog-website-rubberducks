import React from "react";
import {Redirect} from "react-router-dom";
import  Login  from '../components/log-in';

class UserService {
  constructor() {
    this._isLoggedIn = false;
    this._availableUserid = true;
  }
  
  isLoggedIn() {
    return this._isLoggedIn;
  }

  availableUserid(){
    return this._availableUserid;
  }

  logIn(userIdAndPassword) {
    console.log(userIdAndPassword);
    const loginURL = "https://final-project-rubberducks.glitch.me/login";
    //title, content, userId, userName
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userIdAndPassword),
      "Access-Control-Allow-Origin": "*"
    };
    // fetch(loginURL, requestOptions).then(res => {
    //   if (res.redirected == true && res.url == loginURL) {
    //     //redirect back to Login page means failed.
    //     this._isLoggedIn = false;
    //   } else if (res.redirected == true && res.url != loginURL) {
    //     //redirect  to Home page means success.
    //     console.log(this);
    //     this._isLoggedIn = true;
    //     this.props.history.push("/");
    //   }
    // });
    ///after ZYC's API
    fetch("https://final-project-rubberducks.glitch.me/login", requestOptions)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  }

  signUp(userInfo) {
    console.log(userInfo);
    const signupURL = "https://final-project-rubberducks.glitch.me/signup";
    const requestOptions = {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(userInfo),
      "Access-Control-Allow-Origin": "*"
    };
    fetch(signupURL, requestOptions)
    .then(res => {
      if (res.redirected == true && res.url == signupURL) {
        //Back to signup page means userID exists, show alert and register again
        this._availableUserid = false;
        alert("This userid has been used, please enter a new userID!!");
      } else {
        //userid is available, redirect to login page
        this._availableUserid = true;
        return  <Redirect to='/login'/>;
      }
    })
    .then((userInfo)=>{
      console.log("Success",userInfo)
    });
  }
}

export default UserService;
