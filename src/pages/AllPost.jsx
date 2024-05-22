import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                setPosts(posts.documents)
                setLoader(false)
            })
            .catch(()=>{
                setLoader(false)
            })
    }, [])

    if (loader) {
        return (
            <div className='w-full h-[300px] flex items-center justify-center'>
                <img src='../../public/assets/spinner.gif'></img>
            </div>
        )
    }
    else {
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
}

export default AllPost