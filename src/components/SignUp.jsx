import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { logIn } from '../slices/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { Input, Button, Logo } from './index.js'
import { Link } from 'react-router-dom'

function SignUp() {
    const { register, handleSubmit } = useForm()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmitHandler = async (data) => {
        setSubmitting(true)
        console.log(data)
        setError('')
        try {
            const session = await authService.register(data.name, data.email, data.password)
            console.log(session)
            if (session) {
                const user = await authService.getCurrentUser()
                if (user) {
                    dispatch(logIn(user))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
        setSubmitting(false)
    }

    return (
        <div className="flex items-center justify-center">
            {submitting ? <LoadingMSG message='Registering..' /> : null}
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp