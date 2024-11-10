import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  const[name,setName]=useState('Rohit Sharma')
  const[email,setEmail]=useState('RohitSharma@gmail.com')
  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="Profile_header">
        <p>Update Password</p>
      </div>
      <div className="form">
      <div className="form_container">
        <div className="form_control">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} name="name" readOnly/>
        </div>
        <div className="form_control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} name="email" readOnly/>
        </div>
      </div>
      </div>
      <div className="text-center updateProfile-btn">
        Update Profile
      </div>

      <div className="text-center updatePassword-btn" >
      <p onClick={openModal}>  Update Password </p>
      </div>

     
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="model-heading">
            <button className="close-modal-btn" onClick={closeModal}>&times;</button>
            Update Password
            </div>
            <form className="p-3">
              <div className="form_control">
                <label htmlFor="OldPassword">Old Password</label>
                <input type="password" id="OldPassword" name="password" />
              </div>
              <div className="form_control">
                <label htmlFor="NewPassword">New Password</label>
                <input type="password" id="NewPassword" name="password" />
              </div>
              <div className="form_control">
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input type="password" id="ConfirmPassword" name="password" />
              </div>
              <div className="text-center updateProfile-btn">
        Update Profile
      </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
