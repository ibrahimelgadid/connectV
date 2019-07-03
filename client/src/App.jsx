import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import './App.css';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilis/setAuthToken";
import { setCurrentUser ,logoutUser} from "./actions/authActions";
import store from "./store";

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import { clearCurrentProfile } from './actions/profileActions';
import Spinner from './components/common/Spinner';
import PrivateRoute from './components/common/PrivateRoute';
import createProfile from './components/create-profile/create-profile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/Post/Post';


if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded))

  const currentDate = Date.now() / 1000;

  if(decoded.exp < currentDate ){

    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }

}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <div>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/spinner' component={Spinner}/>
            <Route exact path='/profiles' component={Profiles}/>
            <Route exact path='/profile/:handle' component={Profile}/>
            <Switch>
            <Route exact path='/not-found'  component={NotFound}/>
            </Switch>
            


            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/create-profile' component={createProfile}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/edit-profile' component={EditProfile}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/add-experience' component={AddExperience}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/add-education' component={AddEducation}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/feed' component={Posts}/>
            </Switch>

            <Switch>
              <PrivateRoute exact path='/post/:id' component={Post}/>
            </Switch>
            
            </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}


export default App;