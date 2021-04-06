import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './Components/About';
import NavBar from './Components/NavBar';

function App() {
  return (
    
    <Router>
      <NavBar />
      <Route path='/about' component={About} />
      <Route path='/' />
    </Router>
    
  );
}

export default App;
