import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Application from './Components/Application'
import UserProvider from './Providers/UserProvider'

import About from './Components/About';
import NavBar from './Components/NavBar';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import ProfilePage from './Components/ProfilePage';

function App() {
  return (
    <Router>
      <UserProvider>
        <NavBar />
        <Route path='/signIn' component={SignIn} />
        <Route path='/signUp' component={SignUp} />
        <Route path='/profile' component={ProfilePage} />
      </UserProvider>
    </Router>
  );
}

export default App;
