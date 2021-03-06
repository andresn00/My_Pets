import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Form, Button, Alert } from 'react-bootstrap'

import { auth } from '../firebase'
import { signInWithGoogle } from '../firebase'
import { generateUserDocument } from '../firebase'
import { addDocument, updateDocument } from '../firestore'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(null)

    const history = useHistory()

    const createUserWithEmailAndPasswordHandler = async (e, isVet) => {
        e.preventDefault()
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            const userCreated = await generateUserDocument(user, name, isVet);
            if (isVet) {
                const vetCreated = await createVetDoc(email, name)
                updateDocument('users', userCreated.uid, {vet: vetCreated.id})
            }
            // history.push('/home')
        }
        catch (error) {
            setError('Error Signin up with email and password')
            console.error(error)
        }
    }

    const createVetDoc = (email, nombre) => {
        const res = addDocument('vets', {
            email,
            nombre
        })
        console.log(res)
        return res
    }

    return (
        <div className='Sign-form'>
            <h1 className="text-center">Registrarse</h1>
            <div className="border px-3 mx-3 Sign-form-box">
                {error !== null && <Alert variant='danger'>
                    {error}
                </Alert>
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
                        <Form.Label>Contrase??a:</Form.Label>
                        <Form.Control type='password' placeholder='Contrase??a'
                            onChange={(e => setPassword(e.target.value))} />
                    </Form.Group>
                    <div className='text-center' >
                        <Button className='mr-2'
                            onClick={(e) => {
                                createUserWithEmailAndPasswordHandler(e, false)
                            }}>
                            Registrarse como Usuario
                        </Button>
                        <Button variant='success'
                            onClick={(e) => {
                                createUserWithEmailAndPasswordHandler(e, true)
                            }}>
                            Registrarse como Veterinaria
                        </Button>
                        <p className="text-center my-3">o</p>
                        <Button block variant='outline-secondary'
                            onClick={signInWithGoogle}>
                            Inicia Sesi??n con Google
                        </Button>
                    </div>
                </Form>
                <p className='text-center my-3'>
                    Ya tienes una cuenta?{' '}
                    <Link to='/signIn' className='text-blue-500 hover:text-blue-600'>
                        Inicia sesi??n aqu??
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
