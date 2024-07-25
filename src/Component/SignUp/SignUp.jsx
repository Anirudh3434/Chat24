import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../Firebase/auth'; // Adjust the path as needed
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const createAccount = async (e) => {
        e.preventDefault(); 

        if (!name || !email || !password) {
            toast.error('Please fill in all fields', {
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

        setLoading(true); // Start loading indicator

        try {
            const user = await signUp(email, password, name);
            if (user) {
                toast.success('Account created successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce
                });
                navigate('/login'); // Navigate after success
            }
        } catch (error) {
            toast.error('Sign-up failed: ' + error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce
            });
            console.error('Sign-up error:', error); // Log error
        } finally {
            setLoading(false); // Stop loading indicator
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
                <h2>Sign Up</h2>
                <form onSubmit={createAccount}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <span>Already have an account? <Link to='/login' className='switch'>Login</Link></span>
            </div>
        </div>
    );
}

export default SignUp;
