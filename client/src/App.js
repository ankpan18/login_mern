import React from 'react'
// import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

 /**Import all components  */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

/**Auth Middleware */
import { AuthorizedUser,ProtectRoute } from './middleware/auth';

export default function App() {
  return (
   
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<Username/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/password" element={<ProtectRoute><Password/></ProtectRoute>}/>
    <Route path="/profile" element={<AuthorizedUser><Profile/></AuthorizedUser>}/>
    <Route path="/recovery" element={<Recovery/>}/>
    <Route path="/reset" element={<Reset/>}/>
    <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>
  )
}
