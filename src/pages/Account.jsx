import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AccountForm from '../components/account-form/AccountForm'
import appwriteService from '../appwrite/config'
import { PostCard } from '../components'

function Account() {
    const userData = useSelector(state => state.userData)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPostsByUser(userData.$id)
            .then((posts) => {
                setPosts(posts.documents)
            })
    })

    return (
        <div className='flex flex-col gap-2'>
            <AccountForm accountData={userData} />
            <div className='w-full mb-5'>
                <h1 className='m-4 mb-7 font-bold bg-gray-600 text-white rounded-sm p-4'>My Posts</h1>
                <div className='w-full px-3 flex flex-wrap'>
                    {
                        posts.map((post) =>
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Account