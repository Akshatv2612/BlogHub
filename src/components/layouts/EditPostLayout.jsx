import React,{useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/config'

function EditPostLayout({ children }) {
    const navigate = useNavigate()
    const slug = useParams()
    const user = useSelector(state => state.userData)

    useEffect(() => {
        appwriteService.getPost(slug)
            .then((post) => {
                if (post.userId !== user.$id) {
                    navigate('/')
                }
            })
            .catch(() => {
                navigate('/')
            })
    }, [slug])

    return (
        <div>{children}</div>
    )
}

export default EditPostLayout