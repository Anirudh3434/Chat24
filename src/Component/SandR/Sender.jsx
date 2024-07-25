import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import service from '../../../Appwrite/database';
import { getCurrentUser } from '../../Firebase/auth'; 
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sender() {
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    
    const now = new Date();
    const date = format(now, 'MMMM dd, yyyy');
    const time = format(now, 'HH:mm:ss');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = getCurrentUser(); 
                if (currentUser) {
                    setUsername(currentUser.displayName ); 
                } else {
                    setUsername('Guest');
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

    const sendMsg = async (e) => {
        e.preventDefault();

        if (!username) {
            toast.error('Username is not available.', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce
            });
            return;
        }

        const data = {
            name: username,
            message: message,
            key: key,
            date: date,
            time: time
        };

        try {
            await service.createPost(data);
            toast.success('Message sent!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce
            });
            setMessage(''); // Clear message input after sending
            setKey(''); // Clear key input after sending
            navigate('/');
        } catch (error) {
            toast.error('Message sending failed: ' + error.message, {
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

    return (
        <div className="login-container">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <div className="login-box">
                <h2>Create Chat Session</h2>
                <form onSubmit={sendMsg}>
                    <div className="input-group">
                        <label htmlFor="message">Message</label>
                        <input 
                            type="text" 
                            id="message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="key">Create Key</label>
                        <input 
                            type="password" 
                            id="key" 
                            value={key} 
                            onChange={(e) => setKey(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-button">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Sender;
