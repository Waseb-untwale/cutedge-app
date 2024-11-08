import React from 'react'
import './Home.module.css'
import LogoImage from '../Images/Logo-img.png'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Category from './Pages/Category'
import Blog from './Pages/Blog'
import Profile from './Pages/Profile'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <>
     <header>
      <div className="p-4 img_logo">
        <img  src={LogoImage} alt="Logo-img"/>
      </div>
     </header>
     <div className='content'>
     <Sidebar/>
     <div className='outlet'>
     <Outlet />
     </div>
     
      </div>
      <Footer/>
     
    </>
  )
}

export default Home
