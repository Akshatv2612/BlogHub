import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'


function PostCard({$id, title, image}) {
    const [img,setImg]=useState()
    
    useEffect(()=>{
        appwriteService.getFilePreview(image)
        .then((img)=>{
            setImg(img)
        })
    })

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-full flex flex-col justify-between items-center bg-gray-200 rounded-xl p-4'>
                <div className='w-full flex justify-center justify-center mb-4'>
                    <img src={img} alt={title}
                    className='rounded-xl max-w-[100]' />
                </div>
                <h2
                className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
      )
}

export default PostCard