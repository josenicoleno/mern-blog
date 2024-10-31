import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Spinner } from 'flowbite-react'

export default function VerifyEmail() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/auth/verify-email/${token}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          return;
        }
        setSuccess(data.message);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
        window.setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      }
    };
    verifyEmail();
  }, []);

  return (
    <div className='flex flex-col items-center h-screen'>
      <h1 className='text-2xl font-bold'>Verify Email</h1>
      <div className='flex flex-col items-center justify-center h-screen'>

        {
          loading ? (
            <Spinner />
          ) : error ? (
            <div >
              <h1>{error}</h1>
            </div>
          ) : success ? (
            <div >
              <h1>{success}</h1>
            </div>
          ) : (
            <div >
              <h1>Something went wrong</h1>
            </div>
          )
        }
      </div>
    </div>
  );
}
