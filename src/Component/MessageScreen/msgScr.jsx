import React, { useEffect, useState } from 'react';
import './msg.css';
import { useDispatch , useSelector } from 'react-redux';
import authService from '../../../Appwrite/auth';
import { format } from 'date-fns';
import service from '../../../Appwrite/database';
import { addKey , clearKeys } from '../../../Store/slice';

function MsgScr() {
    const [key, setKey] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [msg , setMsg] = useState('')
    const [username , setUsername] = useState(null)

    const now = new Date();
    const date = format(now, 'MMMM dd, yyyy');
    const time = format(now, 'HH:mm:ss');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUsername(currentUser.name);
            } catch (error) {
               
                alert(error);
            }
        };
    
        fetchUserData();
    }, []);

    const fetchMsg = async (e) => {
        e.preventDefault();

        

        try {
            const response = await service.getAllPosts(key);
            setMessages(response.documents);
      
         
        } catch (error) {
            setError('Failed to fetch messages. Please try again.');
            console.error(error);
        }
    };

    const sendMsg= async()=>{
          const data = {
            name: username,
            message : msg,
            key: key,
            date: date,
            time: time
            }

            try {
                const response = await service.createPost(data);
                alert('msg send')
            } catch (error) {
                alert(error)
            }
    }

    

    return (
        <div className="msg-scr">
            <div className='search'>
                <form onSubmit={fetchMsg} className='id-search'>
                    <label htmlFor="">Enter Key to get Chat</label>
                    <input
                        type="password"
                        placeholder="Search..."
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className='chats'>
                {messages.map((msg) => (
                    <div key={msg.$id} className='chatBubble'> 
                     <h2 className='msg-username'>{msg.name}</h2>
          <div className='msg-text-container'>
          <span className='msg-text'>{msg.message}</span>
          </div>
              <div className='msg-info'>
              <span className='msg-date'>{msg.date}</span>
              <span className='msg-time'>{msg.time}</span>
              </div>

                    </div>
                ))}
                {
                    key ? <div className='sendbox'>
                <input type="text" 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                />
                <button onClick={sendMsg}>Send</button>
                    </div>:<></>
                }
                
            </div>
        </div>
    );
}

export default MsgScr;
