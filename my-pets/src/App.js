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
import ProtectedVetRoute from './Components/ProtectedVetRoute'
import Users from './Components/Users';
import Pets from './Components/Pets';
import Carnets from './Components/Carnets';

function App() {
  const { user, userLoaded } = useContext(UserContext)

  return (
    <>
      {userLoaded ?
        <Router>
          <NavBar />
          <div className='mt-5 pt-1'>
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
              <ProtectedVetRoute path='/users' redirectTo='/'>
                <Users />
              </ProtectedVetRoute>
              {/* <Route path='/usuarios' component={Users} /> */}
              <Route path='/carnets/:id' component={Carnets} />
              <Route path='/pets/:id' component={Pets} />

              {/* {user ?
                <Carnets /> : <Redirect to='/home' />}
            </Route>
            <Route path='/pets/:id' >
            {user ?
                <Pets /> : <Redirect to='/home' />}
            </Route> */}


            </Switch>
          </div>
        </Router>
        :
        <div>Loading...</div>
      }

    </>
  );
}

export default App;
