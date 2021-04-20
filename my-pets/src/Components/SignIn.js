import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Form, Button, Alert } from 'react-bootstrap'

import { auth, signInWithGoogle } from '../firebase'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory()

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email")
      console.error("Error signing in with password and email")
    })
    if (error == null) {
      //history.push('/')
    }
  };

  return (
    <div className='Sign-form'>
      <h1 className="text-center">Iniciar Sesión</h1>
      <div className="border px-3 mx-3 Sign-form-box">
        {error !== null && <Alert variant='danger'>
          {error}
        </Alert>
        }
        <Form className='m-3'>
          <Form.Group controlId='userEmail'>
            <Form.Label>Email:</Form.Label>
            <Form.Control type='email' placeholder='Enter email'
              onChange={(e => setEmail(e.target.value))} />
          </Form.Group>
          <Form.Group controlId='userPassword'>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type='password' placeholder='Contraseña'
              onChange={(e => setPassword(e.target.value))} />
          </Form.Group>
          <Button block
            onClick={e => signInWithEmailAndPasswordHandler(e, email, password)}>
            Iniciar Sesión
            </Button>
          <p className="text-center my-3">or</p>
          <Button block variant='outline-secondary'
            onClick={signInWithGoogle}>
            Inicia Sesión con Google
        </Button>
        </Form>
        <p className='text-center' style={{fontSize:15}}>
          No tienes cuenta?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Regístrate aquí
          </Link>{" "}
          <br />{" "}
          {/* <Link to='passwordReset' className='text-blue-500 hover:text-blue-600'>
            Forgot Password?
          </Link> */}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
