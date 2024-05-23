import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../'
import authService from '../../appwrite/auth'

function AccountForm({ accountData }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: accountData?.name || "",
            email: accountData?.email || "",
            password: accountData?.password || "",
        },
    })

    const onSubmitHandler = async (data) => {
        if (active) {
            await authService.updateUserName(data.name)
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    throw error
                })

            setActive(false)
        } else {
            setActive(true)
        }
    }

    const [active, setActive] = useState(false)

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className='w-full'>
            <div className='w-full flex justify-evenly py-8'>
            <Input
                label="Name: "
                disabled={!active}
                className={active?'border-gray-700 border-2 bg-white':'bg-gray-400'}
                {...register("name", { required: true })}
            />
            <Input
                label="Email: "
                disabled={true}
                className='bg-gray-400'
                {...register("email", { required: true })}
            />
            <Button >
                {active ? 'Save' : 'Edit'}
            </Button>
            </div>
        </form>
    )
}

export default AccountForm