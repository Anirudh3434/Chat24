import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../Appwrite/auth';
import { useDispatch } from 'react-redux';
import { logOut, logIn } from '../../../Store/slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        try {
            await authService.login(data);  

            toast.success('Logging Sucessfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            navigate('/');
            dispatch(logIn());
        } catch (error) {
            toast(error);
            console.error(error); 
        }
    };

    return (
        <div className="login-container">
           <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition: Bounce
/>
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={login}>
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
                    <button type="submit" className="login-button">Login</button>
                </form>
                <span>Don't have an account? <Link to='/signup' className='switch'>Create account</Link></span>
            </div>
        </div>
    );
};

export default Login;
