import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserName } from '../../Firebase/auth'; 
import { useSelector } from 'react-redux';

function Home() {
  const [userName, setUserName] = useState(null);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const name = getCurrentUserName();
        setUserName(name);
      } catch (error) {
        setUserName(null);
        console.error("Error fetching user data:", error.message);
      }
    };

    if (status === 'loggedIn') {
      fetchUserData();
    } else {
      setUserName(null);
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
          Hi <span className='name'>{userName || 'Guest'}</span>! Welcome to our messaging platform. <br />
          Ready to start a new conversation?
        </h3>
        <button className='start1' onClick={handleSignup}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
