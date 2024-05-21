import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const Posts = appwriteService.getPosts()
        if (Posts) {
            setPosts(Posts.documents)
        }
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map((post) =>
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllPost