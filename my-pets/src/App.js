import React, { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { UserContext } from './Providers/UserProvider';

import About from './Components/About';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ProfilePage from './Components/ProfilePage';
import ProtectedRoute from './Components/ProtectedRoute'
import Users from './Components/Users';
import Carnets from './Components/Carnets';

function App() {
  const { user, userLoaded } = useContext(UserContext)
  console.log('userLoaded', userLoaded)

  return (
    <>
      {userLoaded ?
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/signIn'>
              {user ?
                <Redirect to='/home' /> : <SignIn />}
            </Route>
            <Route path='/signUp'>
              {!user ?
                <SignUp /> : <Redirect to='/home' />}
            </Route>

            <ProtectedRoute redirectTo='/home' path='/profile'>
              <ProfilePage />
            </ProtectedRoute>
            <Route path='/usuarios' component={Users} />
            <Route path='/carnets/:id' component={Carnets} />
            

          </Switch>
        </Router>
        :
        <div>Loading...</div>
      }

    </>
  );
}

export default App;
