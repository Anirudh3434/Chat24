import React from 'react'
import './message.css'
import { TiMessages } from "react-icons/ti";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function Message() {
const navigate = useNavigate()

const handleGetMsg=()=>{
    navigate('/msgsrc')
}


    const handleAddMsg=()=>{
         navigate('/send')
    }

    return (
        <div className='m-container'>
           <button onClick={handleGetMsg}><TiMessages /></button>
           <button onClick={handleAddMsg}><BiMessageSquareAdd /></button>
        </div>
    )
}

export default Message
