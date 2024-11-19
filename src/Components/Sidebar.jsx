import React, { useState, useEffect } from "react";
import ProfileImg from "../Images/Profile-img.png"; 
import styles from "./Sidebar.module.css";
import { CiGrid41 } from "react-icons/ci";
import { LuNewspaper } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios"; // Add axios to handle API requests

const Sidebar = () => {
  const [activeColor, setActiveColor] = useState('Blog');
  const [userName, setUserName] = useState('Rohit Sharma'); 
  const [userProfileImg, setUserProfileImg] = useState(ProfileImg); 
  const navigate = useNavigate();
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("accesstoken"); 
      const response = await axios.get("http://localhost:5000/user/getProfile", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

     
      const { name, profileImage } = response.data.user;
      setUserName(name); // Update the profile name
      setUserProfileImg(profileImage || ProfileImg); 
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  useEffect(() => {
    fetchUserProfile(); 
  }, []);

  const handleClick = async (color) => {
    setActiveColor(color); // Set the active color when a menu item is clicked
  };


  const logoutUser = async()=>{
    await axios.get("http://localhost:5000/user/logout")
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className={`d-flex flex-column flex-shrink-0 text-white ${styles.sideContainer}`}>
      {/* Profile Section */}
      <div
        className={`${styles.profile} d-flex align-items-center text-center p-3 mt-3 justify-content-center text-right mb-md-0 me-md-auto text-decoration-none`}
      >
        <img
          src={userProfileImg}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "60px", height: "60px" }} // Increase the size of the profile image
        />
        <span className="ps-3">{userName}</span> {/* Show the fetched user name */}
      </div>

      {/* Admin Section */}
      <div className={`text-center my-2 p-2 ${styles.adminstraitor}`}>
        ADMINISTRATION
      </div>

      {/* Navigation Links */}
      <ul className={`nav nav-pills flex-column mb-auto ${styles.redirect}`}>
        <li className="nav-item">
          <Link
            to="/Category"
            className="nav-link text-white text-center d-flex gap-3 justify-content-center align-items-center"
            aria-current="page"
            onClick={() => handleClick("Category")} // Set "Category" as active color
          >
            <CiGrid41
              style={{
                color: activeColor === "Category" ? "#CA4C27" : "inherit", // Change color based on active item
              }}
              size={28}
            />
            <span>Category</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Blog"
            className="mt-2 nav-link text-white text-center d-flex gap-4 justify-content-center align-items-center"
            onClick={() => handleClick("AllBlog")} // Set "AllBlog" as active color
          >
            <LuNewspaper
              style={{
                color: activeColor === "AllBlog" ? "#CA4C27" : "inherit", // Change color based on active item
                opacity: 0.8,
              }}
              size={28}
            />
            <span>All Blog</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Profile"
            className="mt-2 nav-link text-white text-center d-flex gap-4 justify-content-center align-items-center"
            onClick={() => handleClick("Profile")} // Set "Profile" as active color
          >
            <CgProfile
              style={{
                color: activeColor === "Profile" ? "#CA4C27" : "inherit", // Change color based on active item
                opacity: 0.8,
              }}
              size={28}
            />
            <span>Profile</span>
          </Link>
        </li>
      </ul>

      {/* <div className={`mt-3 ${styles.Empty}`}></div> */}
      <a className={`mt-3 ${styles.logOut}`} onClick={logoutUser}>
        <BiLogOut size={28} style={{ color: activeColor === "LogOut" ? "#CA4C27" : "inherit", opacity: 0.8 }} />
        LogOut
      </a>
    </div>
  );
};

export default Sidebar;
