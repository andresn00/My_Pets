import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import { auth } from '../firebase'
import { signInWithGoogle } from '../firebase'
import { generateUserDocument } from '../firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(null)

    const createUserWithEmailAndPasswordHandler = async (e, email, password, isVet) => {
        e.preventDefault()
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            console.log(user);
            await generateUserDocument(user, name, isVet);
        }
        catch (error) {
            setError('Error Signin up with email and password')
        }

        setEmail('')
        setPassword('')
        setName('')
    }

    return (
        <div className='Sign-form'>
            <h1 className="text-center">Registrarse</h1>
            <div className="border px-3 mx-3 Sign-form-box">
                {error !== null && <div className="py-4 w-full text-center mb-3">
                    {error}
                </div>
                }
                <Form className='m-3'>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type='text' placeholder='Nombre'
                            onChange={(e => setName(e.target.value))} />
                    </Form.Group>
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
                    <div className='text-center' >
                        <Button className='mr-2'
                            onClick={(e) => {
                                createUserWithEmailAndPasswordHandler(e, email, password, false)
                            }}>
                            Registrarse como Usuario
                        </Button>
                        <Button variant='success'
                            onClick={(e) => {
                                createUserWithEmailAndPasswordHandler(e, email, password, true)
                            }}>
                            Registrarse como Veterinaria
                        </Button>
                        <p className="text-center my-3">o</p>
                        <Button block variant='outline-secondary'
                            onClick={signInWithGoogle}>
                            Inicia Sesión con Google
                        </Button>
                    </div>
                </Form>
                <p className='text-center my-3'>
                    Ya tienes una cuenta?{' '}
                    <Link to='/signIn' className='text-blue-500 hover:text-blue-600'>
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
