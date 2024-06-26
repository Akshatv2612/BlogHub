import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logIn } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Logo } from './index.js'
import { Link } from 'react-router-dom'
import LoadingMSG from './spinners/LoaderMSG.jsx'

function Login() {
    const { register, handleSubmit } = useForm()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmitHandler = async (data) => {
        setSubmitting(true)
        setError('')
        try {
            const session = await authService.login(data.email, data.password)
            if (session) {
                const user = await authService.getCurrentUser()
                if (user) {
                    dispatch(logIn(user))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error)
        }
        setSubmitting(false)
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            {submitting ? <LoadingMSG message='Signing In' /> : null}
            <div className={`mx-auto w-full max-w-lg bg-gray-500 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">Error while login{`${error}`}</p>}
                <form onSubmit={handleSubmit(onSubmitHandler)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            type='email'
                            placeholder='Enter your email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label='Password: '
                            type='password'
                            placeholder='Enter your password'
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login