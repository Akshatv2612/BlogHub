import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index.js'
import appwriteService from '../../appwrite/config.js'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingMSG from '../spinners/LoaderMSG.jsx'

function PostForm({ post }) {
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [submitting,setSubmitting]=useState(false)
    const [uploadedIMG, setUploadedIMG] = useState()
    const navigate = useNavigate();
    const userData = useSelector(state => state.userData)
    const title = watch('title')

    const submit = async (data) => {
        setSubmitting(true)
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                appwriteService.deleteFile(post.image);
            }
            const Post = await appwriteService.updatePost(post.$id, {
                ...data,
                image: file ? file.$id : post.image
            })

            if (Post) {
                navigate(`/post/${Post.$id}`)
            }
        } else {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                const Post = await appwriteService.createPost({ ...data, userId: userData.$id, image: file.$id })
                if (Post) {
                    navigate(`/post/${Post.$id}`)
                }
            }
        }
        setSubmitting(false)
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        else {
            return "";
        }
    }, []);

    useEffect(() => {
        setValue("slug", slugTransform(title), { shouldValidate: true });
    }, [title])

    useEffect(() => {
        if (post) {
            appwriteService.getFilePreview(post.image)
                .then((img) => {
                    setUploadedIMG(img.href)
                })
        }
    }, [])

    return (
        <div>
        {submitting ?<LoadingMSG message='Saving Post'/> :null }
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    disabled={true}
                    {...register("slug", { required: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={uploadedIMG}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post? "Update" : "Create"}
                </Button>
            </div>
        </form>
        </div>
    );
}

export default PostForm