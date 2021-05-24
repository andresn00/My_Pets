import React, { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { UserContext } from './Providers/UserProvider';
import { Spinner } from 'react-bootstrap'

import About from './Components/About';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ProfilePage from './Components/ProfilePage';
import ProtectedRoute from './Components/ProtectedRoute'
import ProtectedVetRoute from './Components/ProtectedVetRoute'
import Users from './Components/Users';
import Pets from './Components/Pets';
import Carnets from './Components/Carnets';
import Home from './Components/Home';

function App() {
  const { user, userLoaded } = useContext(UserContext)

  return (
    <>
      {userLoaded ?
        <Router>
          <NavBar />
          <div className='mt-5 pt-1'>
            <Switch>
              <Route exact path='/home'>
                {user ?
                  (user.isVet ? <Redirect to='/users' /> :
                    <Redirect to={`/carnets/${user.uid}`} />) :
                  <Home />}
              </Route>


              <Route exact path='/signIn'>
                {user ?
                  (user.isVet ? <Redirect to='/users' /> :
                    <Redirect to={`/carnets/${user.uid}`} />) :
                  <SignIn />}
              </Route>
              <Route path='/signUp'>
                {user ?
                  (user.isVet ? <Redirect to='/users' /> :
                    <Redirect to={`/carnets/${user.uid}`} />) :
                  <SignUp />}
              </Route>

              <ProtectedRoute redirectTo='/home' path='/profile'>
                <ProfilePage />
              </ProtectedRoute>
              <ProtectedVetRoute path='/users' redirectTo='/home'>
                <Users />
              </ProtectedVetRoute>

              <ProtectedRoute redirectTo='/home' path='/carnets/:id'>
                <Carnets />
              </ProtectedRoute>
              {/* <Route path='/carnets/:id' component={Carnets} /> */}
              <Route path='/pets/:id' component={Pets} />

            </Switch>
          </div>
        </Router>
        :
        <div className='text-center mt-5'>
          <Spinner animation="border" variant='primary'
            style={{ width: '15vmin', height: '15vmin' }} />
        </div>
      }

    </>
  );
}

export default App;
