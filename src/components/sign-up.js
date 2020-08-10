import React, { Component } from "react";
// import UserService from "../services/user-service";
import { Redirect } from "react-router-dom";
import "../w3.css";
import "./form.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      password: "",
      password2: "",
      nickname: "",
      description: "",
      gender: ""
    };
    this._isPwdMatch = false;

    this.handleSubmit = this.submitClick.bind(this);
    this.handleChangeUserid = this.handleUseridChange.bind(this);
    this.handleChangePassword = this.handlePasswordChange.bind(this);
    //add handleChange2Password here  by SIM
    this.handleChange2Password = this.handlePassword2Change.bind(this);
    this.handleChangeNickname = this.handleNicknameChange.bind(this);
    this.handleChangeDescription = this.handleDescriptionChange.bind(this);
    this.handleChangeGender = this.handleGenderChange.bind(this);
    // this.userService = new UserService();
  }
  // handlers
  handleUseridChange(event) {
    this.setState({ _id: event.currentTarget.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    /* This is weird... why can't I track _isPwdMatch in here? */
    // this._isPwdMatch = (this.state.password === this.state.password2) ? true : false;
    // console.log(this.state.password, this.state.password2 ,this._isPwdMatch);
  }
  handlePassword2Change(event) {
    this.setState({ password2: event.target.value });
    // console.log(this.state.password, this.state.password2 ,this._isPwdMatch);
    // this._isPwdMatch = (this.state.password === this.state.password2) ? true : false;
  }
  handleNicknameChange(event) {
    this.setState({ nickname: event.currentTarget.value });
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.currentTarget.value });
  }
  handleGenderChange(event) {
    this.setState({ gender: event.currentTarget.value });
  }

  submitClick(event) {
    const form = document.getElementById("sign-up-form");
    if (form.checkValidity()) {
      event.preventDefault();
      console.log(this.state._id);
      if (this.state.password !== this.state.password2) {
        alert("Please check your password!");
      } else {
        // sign up
        const signupURL = "https://final-project-rubberducks.glitch.me/signup";
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            _id: this.state._id,
            password: this.state.password,
            nickname: this.state.nickname,
            description: this.state.description,
            gender: this.state.gender
          }),
          "Access-Control-Allow-Origin": "*"
        };
        fetch(signupURL, requestOptions)
          .then(res => {
            if (res.redirected === true && res.url === signupURL) {
              //Back to signup page means userID exists, show alert and register again
              this._availableUserid = false;
              alert("This userid has been used, please enter a new userID!!");
            } else if (res.status == 201) {
              //userid is available, redirect to login page
              this._availableUserid = true;
              this.props.history.push("/login");
              return <Redirect to="/login" />;
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .then(userInfo => {
            console.log("Success", userInfo);
          });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="intro">
          <h5>Join Us</h5>
          <p className="subtitle">Sharing your colorful life!!</p>
        </div>
        <form className="form" id="sign-up-form" onSubmit={this.handleSubmit}>
          <p>
            <label>User ID:</label>
            <input
              type="text"
              className="w3-input w3-border w3-round-large"
              id="userid"
              placeholder="Enter numbers and letters as your login ID"
              value={this.state._id}
              onChange={this.handleChangeUserid}
              required
            />
          </p>
          <p>
            <label>Nickname:</label>
            <input
              className="w3-input w3-border w3-round-large"
              id="nn"
              placeholder="Enter a nickname for this account"
              type="text"
              value={this.state.nickname}
              onChange={this.handleChangeNickname}
              required
            />
          </p>
          <p>
            <label>Gender:</label>
            <select
              className="w3-select"
              name="genderOption"
              id="gender"
              value={this.state.gender}
              onChange={this.handleChangeGender}
              required
            >
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Animal Cross Islander">
                Animal Cross islander
              </option>
            </select>
          </p>
          <p>
            <label>Profile:</label>
            <textarea
              className="w3-input w3-border w3-round-large"
              rows="3"
              id="desc"
              placeholder="Describe yourself here"
              type="text"
              value={this.state.description}
              onChange={this.handleChangeDescription}
            />
          </p>
          <p>
            <label htmlFor="pwd">Password:</label>
            <input
              className="w3-input w3-border w3-round-large"
              id="pwd"
              placeholder="Enter password for this account"
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
              required
            />
          </p>
          <p>
            <label htmlFor="pwd2">Input your password again:</label>
            <input
              className="w3-input w3-border w3-round-large"
              id="pwd2"
              placeholder="Enter your password again"
              type="password"
              value={this.state.password2}
              onChange={this.handleChange2Password}
              required
            />
          </p>

          <button type="submit" className="w3-button w3-amber" value="sign up">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
