import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const signInWithEmailAndPasswordHandler =
        (event, email, password) => {
            event.preventDeafult();
        }
    
    return (
        <div className='mt-8'>
            <h1 className='text-3x1 mb-2 text-center font-bold'>Sign In</h1>
            <div className='border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8'>
                {error !== null && <div className='py-4 bg-red-600 w-full text-white text-center mb-3'>{error}</div>}
                <form className=''>
                    <label htmlFor='userEmail' className='block'>
                        Email:
                    </label>
                    <input type='email' className='my-1 p-1 w-full'
                        name='userEmail' value={email}
                        placeholder='example@gmail.com' id='userEmail'
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor='userPassword' className='block'>
                    Password:
                    </label>
                    <input type='password' className='my-1 p-1 w-full'
                        name='userPassword' value={password}
                        placeholder='Password' id='userPassword'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button className='bg-red-500 hover:bg-red-600 w-full py-2 text-white'>
                        Sign In
                    </button>
                </form>
                <p className='text-center my-3'>
                    Don't have an account?{' '}
                    <Link to='signUp' className='text-blue-500 hover:text-blue-600'>
                        Sign up here
                    </Link>{' '}
                    <br />{' '}
                    <Link to='passwordReset' className='text-blue-500 hover:text-blue-600'>
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignIn
