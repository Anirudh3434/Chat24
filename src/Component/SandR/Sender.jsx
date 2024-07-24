import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../Appwrite/auth';
import { format } from 'date-fns';
import service from '../../../Appwrite/database';

function Sender() {
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [error, setError] = useState(null);
    const [username , setUseName] = useState(null)
    const navigate = useNavigate();
    
    const now = new Date();
    const date = format(now, 'MMMM dd, yyyy');
    const time = format(now, 'HH:mm:ss');

   
    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const currentUser = await authService.getCurrentUser();
              setUseName(currentUser.name);
          } catch (error) {
             
              alert(error);
          }
      };
  
      fetchUserData();
  }, []);


    




    const data = {
        name: username,
        message: message,
        key: key,
        date: date,
        time: time
    };

    const sendMsg = async (e) => {
        e.preventDefault();
        try {
            await service.createPost(data);
            alert('message sent!..')
            navigate('/');
          
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Create Chat Session</h2>
                
                <form onSubmit={sendMsg}>
                    <div className="input-group">
                        <label htmlFor="message">Message</label>
                        <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="key">Create Key</label>
                        <input type="password" id="key" value={key} onChange={(e) => setKey(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-button">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Sender;
