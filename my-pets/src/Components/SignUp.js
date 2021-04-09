import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { auth } from '../firebase'
import { signInWithGoogle } from '../firebase'
import { generateUserDocument } from '../firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState(null)

    const createUserWithEmailAndPasswordHandler = async (e, email, password) => {
        e.preventDefault()
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            console.log(user);
            await generateUserDocument(user, { displayName });
        }
        catch (error) {
            setError('Error Signin up with email and password')
        }

        setEmail('')
        setPassword('')
        setDisplayName('')
    }

    return (
        <div className='Sign-form'>
            <h1 className="text-center">Sign Up</h1>
            <div className="border px-3 mx-3 Sign-form-box">
                {error !== null && <div className="py-4 w-full text-center mb-3">
                    {error}
                </div>
                }
                <Form className='m-3'>
                    <Form.Group controlId='displayName'>
                        <Form.Label>Display Name:</Form.Label>
                        <Form.Control type='text' placeholder='Display Name'
                            onChange={(e => setDisplayName(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId='userEmail'>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type='email' placeholder='Enter email'
                            onChange={(e => setEmail(e.target.value))} />
                    </Form.Group>
                    <Form.Group controlId='userPassword'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type='password' placeholder='Password'
                            onChange={(e => setPassword(e.target.value))} />
                    </Form.Group>
                    <Button block
                        onClick={(e) => {
                            createUserWithEmailAndPasswordHandler(e, email, password)
                        }}>
                        Sign Up
                    </Button>
                    <p className="text-center my-3">or</p>
                    <Button block variant='outline-secondary'
                        onClick={signInWithGoogle}>
                        Sign in with Google
                    </Button>
                </Form>
                <p className='text-center my-3'>
                    Already have an account?{' '}
                    <Link to='/signIn' className='text-blue-500 hover:text-blue-600'>
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
