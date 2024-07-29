import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../../Appwrite/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../Store/slice';
import {getlogOut} from '../../Firebase/auth'
import Menubar from '../MenuBar/MenuBar.jsx'


function Header() {
    const status = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleLogout = async() => {
       getlogOut()
        dispatch(logOut()); 
        localStorage.removeItem('username');
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/login'); 
    };

    const handleMessage = ()=>{
        navigate('/message');
    }

    const handleSignup = () => {
        navigate('/signup'); 
    };

    return (
        <nav>
            <div className="nav-wrapper">
                <div>
                    <Link to="/" className="brand-logo">Chat.24</Link>
                </div>
                <div className='button'>
                    {status === 'loggedIn' ? (
                       
                       <>
                       
                          <button className='login' onClick={handleMessage}>Message</button>
                        <button className='start' onClick={handleLogout}>Log out</button>
                     
                       </>

                     
                    ) : (
                        <>
                         
                            <button className='login' onClick={handleLogin}>Login</button>
                            <button className='start' onClick={handleSignup}>Get Started</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
