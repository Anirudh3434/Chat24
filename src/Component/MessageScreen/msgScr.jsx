import React, { useEffect, useState } from 'react';
import './msg.css';
import { format } from 'date-fns';
import service from '../../../Appwrite/database';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from '../../Firebase/auth'; 
import { updateMessageLength } from '../../../Store/slice'; // Ensure this action exists

function MsgScr() {
    const [key, setKey] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [username, setUsername] = useState('');

    const dispatch = useDispatch();
   
    const now = new Date();
    const date = format(now, 'MMMM dd, yyyy');
    const time = format(now, 'HH:mm:ss');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
            
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    setUsername(storedUsername);
                } else {
                   
                    const currentUser = getCurrentUser();
                    const newUsername = currentUser ? currentUser.displayName : '';
                    setUsername(newUsername);
           
                    localStorage.setItem('username', newUsername);
                }
            } catch (error) {
                toast.error('Failed to fetch user data: ' + error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce
                });
            }
        };
        

        fetchUserData();
    }, []);

    const fetchMessages = async () => {
        if (key) {
            try {
                const response = await service.getAllPosts(key);
                setMessages(response.documents);
            } catch (error) {
                setError('Failed to fetch messages. Please try again.');
                toast.error('Failed to fetch messages. Please try again.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce
                });
            }
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchMessages, 2000); 
        return () => clearInterval(intervalId);
    }, [key]);

    const sendMsg = async () => {
        if (msg.trim() === '') {
            toast.error('Add message Please', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce
            });
            return;
        }

        const data = {
            name: username,
            message: msg,
            key: key,
            date: date,
            time: time
        };

        try {
            await service.createPost(data);
            toast.success('Message Sent', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce
            });
            setMsg('');
        } catch (error) {
            toast.error('Message sending failed: ' + error.message, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    


    return (
        <div className="msg-scr">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <div className='search'>
                <form onSubmit={(e) => e.preventDefault()} className='id-search'>
                    <h2>Hi {username} 😊</h2>
                    <label htmlFor="">Enter Key to get Chat</label>
                    <input
                        type="password"
                        placeholder="Search..."
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button type="button" onClick={fetchMessages}>Get</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className='chats'>
                {messages.map((msg) => (
                    <div key={msg.$id} className={msg.name === username ? 'chatbubbleUser' : 'chatbubbleOther'}>
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
                {key && (
                    <div className='sendbox'>
                        <input
                            type="text"
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                        />
                        <button onClick={sendMsg}>Send</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MsgScr;
