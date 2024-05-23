import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import { Button, Container,LoaderMSG } from "../components";

export default function Post() {
    const [post, setPost] = useState(null);
    const [postImage, setPostimage] = useState(null)
    const [deletion,setDeletion]=useState(false)
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    appwriteService.getFilePreview(post.image)
                        .then((img) => {
                            setPostimage(img.href)
                            console.log(postImage)
                        })
                    setPost(post)
                })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate]);

    const deletePost =async () => {
        setDeletion(true)
        try {
            await appwriteService.deletePost(post.$id)
                .then(() => {
                    try {
                        appwriteService.deleteFile(post.image)
                        .then(()=>{
                            navigate('/')
                        })
                    } catch (error) {
                        console.log('Error while deleting post image')
                    }
                })
        } catch (error) {
            console.log('Error while deleting post')
        }
        setDeletion(false)
    };

    return post ? (
        <div className="py-8">
           {deletion ? <LoaderMSG message='Deleting your post..' /> : null}
            <Container>
                <div className="w-full bg-gray-300 flex justify-center relative border rounded-t-xl p-2">
                    <img width={'500px'}
                        src={postImage}
                        alt={post.title}
                        className="rounded"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full py-4 bg-slate-500 mb-6 rounded-b-xl">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="text-left bg-gray-100 p-8 rounded-b-xl">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}