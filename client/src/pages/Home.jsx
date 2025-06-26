import { Link } from 'react-router-dom';
import CallToAcction from '../components/CallToAction'
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setPosts([]);
        const sizeWindow = window.innerWidth;
        let limit = 9;
        if (sizeWindow < 768) {
          limit = 3
        }
        const res = await fetch(`/api/post/getPosts?limit=${limit}`)
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.message || 'Error fetching posts');
        }
        if (currentUser?.isAdmin) {
          setPosts(data.posts);
        }else{
          setPosts(data.posts.filter(post => post.status !== 'draft'));
        }
        setLoading(false);
        return;
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchPosts();
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome! </h1>
        <p className="text-gray-500 text-xs sm:text-sm">Join and share your thoughts with the world.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 hover:underline font-bold'>View all posts</Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAcction />
      </div>
      <div className="flex flex-col max-w-6xl mx-auto p-3 gap-8 py-7">
        {posts &&
          <div className="flex flex-col gap-6">
            <h2 className='text-2xl font-semibold text-center'>
              Recent Posts
            </h2>
            <div className="flex flex-wrap gap-10 justify-center">
              {posts.map(post =>
                <PostCard key={post._id} post={post} />
              )}
            </div>
            <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>View all posts</Link>
          </div>
        }
      </div>
    </div>
  )
}

