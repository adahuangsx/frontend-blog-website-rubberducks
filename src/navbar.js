import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class NavBar extends Component {
  constructor (state){
    super(state);
    this.state = {
      isLoggedIn: false,
      currentUser: null,
    }; 
    this.signOutClick = this.signOutClick.bind(this);
  }

  signOutClick(){
    console.log("signout click!");
    window.localStorage.removeItem("currentUser");
    const cookies = new Cookies();
    cookies.remove('token', { path: '/', domain: "react-starter-hsx.glitch.me/"});
    this.setState({currentUser: null, isLoggedIn: false});
  }

  componentWillMount() {
    // get the logged-in info
    let currentUser;
    if(currentUser = JSON.parse(window.localStorage.getItem("currentUser"))){ //logged in
      this.setState({currentUser: currentUser, isLoggedIn: true});
    }
  }
  
  render() {
    
    console.log(this.state);
    const myPageLink = "/duck/" + (this.state.currentUser ? this.state.currentUser._id : "");
    const loginORPersonalPage = this.state.isLoggedIn ? <ul><ol><Link className="nav-link" to={myPageLink}>Me</Link></ol>
                                                          <ol><Link className="nav-link" to="/" onClick={this.signOutClick}>Sign out</Link></ol>
                                                        </ul> :
                                                        <Link className="nav-link" to="/login">Log in</Link>;
    return (
      <nav>
          <h3><img src={logo} className="App-logo" alt="logo" />Go Ducks!</h3>
          <ul className="nav-links">
              <Link className="nav-link" to="/">
                <li>Plaza</li>
              </Link>
              <Link className="nav-link" to="/duck">
                <li>People</li>
              </Link>
              <Link className="nav-link" to="/signup">
                <li>Sign up</li>
              </Link>
              {loginORPersonalPage} 
          </ul>

      </nav>
    );
  }

  // userStatus(){


  //   return (
  //     <Link to={myPageLink}>
  //       <li>Me</li>
  //     </Link>
  //   );
  // }
  
}



export default NavBar;
