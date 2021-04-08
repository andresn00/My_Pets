import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
        <div className='mt-8'>
            <h1 className='text-3xl mb-2 text-center font-bold'>Sign Up</h1>
            <div className='border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8'>
                {error !== null && (
                    <div className='py-4 bg-red-600 w-full text-white text-center mb-3'>
                        {error}
                    </div>
                )}
                <form className=''>
                    <label htmlFor='displayName' className='block'>
                        Display Name:
                    </label>
                    <input type='text' className='my-1 p-1 w-full'
                        name='displayName' value={displayName}
                        placeholder='E.g. Faruq' id='displayName'
                        onChange={(e => setDisplayName(e.target.value))}
                    />

                    <label htmlFor='userEmail' className='block'>
                        Email:
                    </label>
                    <input type='email' className='my-1 p-1 w-full'
                        name='userEmail' value={email}
                        placeholder='E.g. example@gmail.com' id='userEmail'
                        onChange={(e => setEmail(e.target.value))}
                    />
                    <label htmlFor='userEmail' className='block'>
                        Password:
                    </label>

                    <input type='password' className='my-1 p-1 w-full'
                        name='userPassword' value={password}
                        placeholder='Password' id='userPassword'
                        onChange={(e => setPassword(e.target.value))}
                    />
                    <button className='bg-green-400 hover:bg-green-500 w-full py-2 text-white'
                        onClick={(e) => {
                            createUserWithEmailAndPasswordHandler(e, email, password)
                        }}>
                        Sign up
                    </button>
                </form>
                <p className='text-center my-3'>or</p>
                <button onClick={signInWithGoogle}
                    className='bg-red-500 hover:bg-red-600 w-full py-2 text-white'>
                    Sign in with Google
                </button>
                <p className='text-center my-3'>
                    Already have an account?{' '}
                    <Link to='/+signIn' className='text-blue-500 hover:text-blue-600'>
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
