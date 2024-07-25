import { React, useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../../Appwrite/auth';
import { useSelector } from 'react-redux';

function Home() {
  const [user, setUser] = useState(null);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };

    if (status !== 'idle') {
      fetchUserData();
    } else {
      setUser(null);
    }
  }, [status]);

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className='container'>
      <div className='title-area'>
        <h1>Create Chat</h1>
        <h3>
          Hi <span className='name'>{user ? user.name : 'Guest'}</span>! Welcome to our messaging platform. <br />
          Ready to start a new conversation?
        </h3>
        <button className='start1' onClick={handleSignup}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
