import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const PasswordReset = () => {
    const [email, setEmail] = useState('')
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)
    const [error, setError] = useState(null)

    const senResetEmail = (e) => {
        e.preventDefault()
    }
    
    return (
        <div className='mt-8'>
            <h1 className='text-xl text-center font-bold mb-3'>
                Reset your Password
            </h1>
            <div className='border border-blue-300 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8'>
                <form action=''>
                    {emailHasBeenSent && (
                        <div className='py-3 bg-green-400 w-full text-white text-center mb-3'>
                            An email has been sent to you!
                        </div>
                    )}
                    {error !== null && (
                        <div className='py-3 bg-red-600 w-full text-white text-center mb-3'>
                            {error}
                        </div>
                    )}
                    <label htmlFor='userEmail' className='w-full block'>
                        Email:
                    </label>
                    <input type='email' name='userEmail' id='userEmail'
                        value={email} placeholder='Input your email'
                        onChange={(e) => setEmail(e.target.value)}
                        className='mb-3 w-full px-1 py-2'
                    />
                    <button className='w-full bg-blue-400 text-white py-3'>
                        Sen me a reset link
                    </button>
                </form>
                <Link to='/' className='my-2 text-blue-700 hover:text-blue-800 text-center block'>
                        &larr; back to sign page
                </Link>
            </div>
        </div>
    )
}

export default PasswordReset
