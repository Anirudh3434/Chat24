import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router-dom'
import Home from './Component/Home/Home.jsx'
import Login from './Component/Login/Login.jsx'
import SignUp from './Component/SignUp/SignUp.jsx'
import { Provider } from 'react-redux'
import store from '../Store/store.js'
import Message from './Component/Message/Message.jsx'
import Sender from './Component/SandR/Sender.jsx'
import MsgScr from './Component/MessageScreen/msgScr.jsx'



const router = createBrowserRouter(
createRoutesFromChildren(
 
    <Route path="/" element={<App />} >
    <Route index element={<Home/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<SignUp/>}/>
    <Route path='message' element={<Message/>}/>
    <Route path='send' element={<Sender/>}/>
    <Route path='msgsrc' element={<MsgScr/>}/>
  </Route>
)
)

ReactDOM.createRoot(document.getElementById('root')).render(
 
<Provider store={store}>
  <RouterProvider router={router} />
</Provider>
 
)
