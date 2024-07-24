import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../../Appwrite/auth'

function SignUp() {
    const [name , setName ] = useState('')
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')



    const navigate = useNavigate()

    const createAccount=()=>{

        const data = {
           
            email:email,
            password:password,
            name:name,
        }

  try {
   const created = authService.createAccount(data)
   if(created){
    alert('Account created')
    navigate('/login')
   }
  } catch (error) {
    alert(error)
  }

        
    }

    return (
        <div className="login-container">
        <div className="login-box">
          <h2>Sign Up</h2>
          <form onSubmit={createAccount}>
          <div className="input-group">
              <label htmlFor="email">Name</label>
              <input type="text"  value={name} onChange={(e)=>{setName(e.target.value)}} required />
              </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <button type="submit" className="login-button">Sign Up</button>
          </form>
          <span>already have account<Link to='/login' className='switch'>Login</Link></span>
        </div>
      </div>
    )
}

export default SignUp
