import {React , useEffect , useState} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import authService from '../../../Appwrite/auth';
import { useSelector } from 'react-redux';




function Home() {
  const [username, setUser] = useState(null);

  const status = useSelector((state)=>state.auth.status)

  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser.name);
        } catch (error) {
           
           
            setUser(null)
        }
    };

    fetchUserData();
}, [status]);
  

const handleSignup = () => {
  navigate('/signup'); 
};

    

    return (
      <div className='container'>
        <div className='title-area'>
           <h1>Create Chat</h1>
           <h3 className=''>Hi <span className='name'>{username}</span> ! Welcome to our messaging platform. <br />Ready to start a new conversation?</h3>
           <button className='start1' onClick={handleSignup}>Get Started</button>
        </div>
       
      </div>
    )
}

export default Home
