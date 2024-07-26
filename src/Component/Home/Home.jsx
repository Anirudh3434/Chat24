import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChangedListener } from '../../Firebase/auth'; 
import { useSelector } from 'react-redux';

function Home() {
  const [userName, setUserName] = useState(null);
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
      const shortName = user.displayName.slice(0,10)+ '..';
      setUserName(shortName);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe(); 
  }, [status]);

  const handleSignup = () => {
   if(status == 'loggedIn'){
         navigate('/message')
   }
   else{
    navigate('/login')
   }
  };

  return (
    <div className='container'>
      <div className='title-area'>
        <h1>Create Chat</h1>
        <h3>
          Hi <span className='name'>{userName || 'Guest'} </span>! Welcome to our messaging platform. <br />
          Ready to start a new conversation?
        </h3>
        <button className='start1' onClick={handleSignup}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
