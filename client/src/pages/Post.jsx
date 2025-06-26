import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Spinner } from 'flowbite-react'
import CallToAction from "../components/CallToAction"
import CommentSection from "../components/CommentSection"
import PostCard from "../components/PostCard"
import { useSelector } from "react-redux"
import { HiArchive, HiQrcode } from "react-icons/hi"

function PostHeader({ title, category, categoryImage, tags }) {
    return (
        <>
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {title}
            </h1>
            <Link
                to={`/search?category=${category}`}
                className="self-center items-center justify-center flex align-center mb-5"
            >
                <Button color="gray" pill className="items-center">
                    <img
                        src={categoryImage}
                        alt={category}
                        className="w-8 h-8 bg-gray-200 rounded-full mr-2"
                    />
                    {category}
                </Button>
            </Link>
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags && tags.map((tag, index) => (
                        <Link
                            to={`/search?tag=${tag}`}
                            key={index}
                            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

function PostImageAuthor({ post }) {
    return (
        <>
            <img
                src={post?.image}
                alt={post?.title}
                className="mt-10 p-3 max-h-[600px] w-full object-cover"
            />
            <div className="flex justify-between items-center gap-1 my-5 text-gray-500 border-b-2 border-gray-300 pb-1">
                <div className="flex items-center gap-1">
                    <p>Written by: </p>
                    <img className='w-10 h-10 rounded-full object-cover' src={post?.userId?.profilePicture} alt="profile" />
                    <Link className='text-xs text-cyan-600 hover:underline' to='/dashboard?tab=profile'>
                        @{post?.userId?.username}
                    </Link>
                </div>
                <div className="flex items-center gap-1">
                    <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="italic">{post && (post.content.length / 1000 + 1).toFixed(0)} mins read</span>
                </div>
            </div>
        </>
    )
}

export default function Post() {
    const { postSlug } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [post, setPost] = useState(null)
    const [recentPost, setRecentPost] = useState(null)
    const [typePost, setTypePost] = useState('post')
    const [categoryImage, setCategoryImage] = useState('')
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
                const data = await res.json();
                if (!res.ok) {
                    setError(true)
                    setLoading(false)
                    return
                }
                if (data.posts.length === 0) {
                    setError('Post not found')
                    setLoading(false)
                    navigate('/search')
                    return
                }
                if (data.posts[0].status === 'draft' && data.posts[0].userId !== currentUser?._id && !currentUser?.isAdmin) {
                    navigate('/search')
                    return
                }
                if (res.ok) {
                    setPost(data.posts[0])
                    const resCategory = await fetch(`/api/category/?category=${data.posts[0].category}`)
                    const dataCategory = await resCategory.json();
                    setCategoryImage(dataCategory[0]?.image || '')
                    setTypePost(dataCategory[0]?.type || 'post')
                    setLoading(false)
                    setError(false)
                }
            } catch (error) {
                console.log(error.message)
                setError(true)
                setLoading(false)
            }
        }
        fetchPost();
    }, [postSlug])

    useEffect(() => {
        const recentPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=3`)
                if (res.ok) {
                    const data = await res.json();
                    setRecentPost(data.posts)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        recentPost();
    }, [])

    if (loading)
        return <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
        </div>

    return (
        <>
            <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
                <PostHeader
                    title={post?.title}
                    category={post?.category}
                    categoryImage={categoryImage}
                    tags={post?.tags}
                />
                {/* Botones solo visibles en pantallas grandes y alineados a la derecha */}
                <div className="hidden lg:flex justify-end w-full gap-2 mt-0 text-gray-500">
                    <Button color="gray" pill onClick={() => { setTypePost(typePost === 'post' ? 'article' : 'post') }}>
                        <HiQrcode className="text-2xl" />
                    </Button>
                    <Button color="gray" pill onClick={() => { setTypePost(typePost === 'post' ? 'article' : 'post') }}>
                        <HiArchive className="text-2xl" />
                    </Button>
                </div>
                {typePost === 'post' ? (
                    <>
                        <PostImageAuthor post={post} />
                        <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{ __html: post?.content }} />
                    </>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                        {/* Columna de imagen */}
                        <div className="justify-center items-start">
                            <PostImageAuthor post={post} />
                        </div>
                        {/* Columna de contenido */}
                        <div className="flex flex-col space-y-4">
                            <div className="post-content" dangerouslySetInnerHTML={{ __html: post?.content }} />
                        </div>
                    </div>
                )}
            </main>
            <div className="max-w-4xl mx-auto w-full">
                <CallToAction />
            </div>
            <CommentSection postId={post?._id} />
            <div className="flex flex-col justify-center items-center max-w-8xl p-3">
                <h1 className="text-xl mt-5">Recent articles</h1>
                <div className="flex flex-wrap gap-5 mt-5 justify-center">
                    {recentPost &&
                        recentPost.map(post => <PostCard key={post._id} post={post} />)
                    }
                </div>
            </div>
        </>
    )
}
