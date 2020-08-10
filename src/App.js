import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './navbar';
import BlogPlaza from './blog-plaza';
import DuckPlaza from './duck-plaza';
import Login from './components/log-in';
import SignUp from './components/sign-up';
import {PersonalPage, PersonalInfo} from './personal-page';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoggedIn: false,
      currentUser: null,
    }
  }
  
  componentWillMount() {
    // call api's /login, store the protected state in the component
    // and then render
    let currentUser;
    // on successful fetch, with success response from the backend /login api,
    if(currentUser = JSON.parse(window.localStorage.getItem("currentUser"))){ //logged in
      this.setState({currentUser: currentUser, isLoggedIn: true});
    }
  }

  

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar/>
          <Switch>
            <Route path="/" exact component={BlogPlaza} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp}/>
            <Route path="/duck" exact component={DuckPlaza} />
            {/* <Route path="/duck" component={PersonalPage} /> */}
            <Route path="/duck/:userid" component={PersonalPage} />
          </Switch>
          
          
        </div>
      </Router>
    );
  }
}

// const ProtectedRoute = ({component: Component, ...rest}) => (
//   <Route {...rest} render = {(props) => (
//     this.props.protected ? <Redirect to = '/login' />
//                          : <Component {...props} />
//     )} 
//   />
// );

export default App;
