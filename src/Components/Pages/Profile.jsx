import React, { useState, useEffect } from "react";
import "./Profile.css";
import { toast, ToastContainer } from "react-toastify"; // Using react-toastify for notifications
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch profile data when the component is mounted
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/getProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, 
          },
        });

        const data = await response.json();
        
        console.log(data.user.name)
        if (response.ok) {
          setName(data.user.name); 
          setEmail(data.user.email); 
        } else {
          toast.error(data.msg || "Failed to fetch profile", { toastId: "profile-fetch-failed" });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("An error occurred. Please try again.", { toastId: "profile-fetch-error" });
      }
    };

    fetchProfile();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!", { toastId: "fields-required" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!", { toastId: "password-mismatch" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/upDatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`, 
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg || "Password updated successfully", { toastId: "password-updated" });
        closeModal();
      } else {
        toast.error(data.msg || "Failed to update password", { toastId: "password-failed" });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again.", { toastId: "password-error" });
    }
  };

  const handleProfileUpdate = async () => {
    if (!name || !email) {
      toast.error("Name and Email cannot be empty!", { toastId: "fields-required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/upDateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Profile updated successfully", { toastId: "profile-updated" });
      } else {
        toast.error(data.message || "Failed to update profile", { toastId: "profile-failed" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again.", { toastId: "profile-error" });
    }
  };

  return (
    <>
      <div className="Profile_header">
        <p>Update Profile</p>
      </div>

      <div className="form">
        <div className="form_container">
          <div className="form_control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)} // Enable editing
            />
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)} // Enable editing
            />
          </div>
        </div>
      </div>

      <div className="text-center updateProfile-btn">
        <button onClick={handleProfileUpdate}>Update Profile</button>
      </div>
      <div className="text-center updatePassword-btn">
        <p onClick={openModal}>Update Password</p>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="model-heading">
              <button className="close-modal-btn" onClick={closeModal}>
                &times;
              </button>
              Update Password
            </div>
            <form className="p-3" onSubmit={(e) => e.preventDefault()}>
              <div className="form_control">
                <label htmlFor="OldPassword">Old Password</label>
                <input
                  type="password"
                  id="OldPassword"
                  name="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="form_control">
                <label htmlFor="NewPassword">New Password</label>
                <input
                  type="password"
                  id="NewPassword"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form_control">
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="ConfirmPassword"
                  name="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="text-center updateProfile-btn">
                <button onClick={handlePasswordUpdate}>Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="right-center" autoClose={2000} />
    </>
  );
};

export default Profile;
