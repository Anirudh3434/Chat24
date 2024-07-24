import {React , useEffect , useState} from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import authService from '../../../Appwrite/auth';



function Home() {
  const [username, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser.name);
        } catch (error) {
           
            alert(error);
        }
    };

    fetchUserData();
}, []);
  

    const signup = ()=>{
   
        navigate('/signup')
    }

    

    return (
      <div className='container'>
        <div className='title-area'>
           <h1>Create Chat</h1>
           <h3 className=''>"Hi {username}! Welcome to our messaging platform. <br />Ready to start a new conversation?"</h3>
           <button className='start1' onClick={signup}>Get Started</button>
        </div>
       
      </div>
    )
}

export default Home
