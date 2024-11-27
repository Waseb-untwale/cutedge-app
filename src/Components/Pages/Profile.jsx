import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const profileToastFlag = useRef(false); // Tracks if profile update toast is shown
  const passwordToastFlag = useRef(false); // Tracks if password update toast is shown

  // Fetch profile data when the component is mounted
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://dangal.gocoolcare.com/user/getProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setName(data.user.name);
          setEmail(data.user.email);
        } else {
          toast.error(data.msg || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("An error occurred. Please try again.");
      }
    };

    fetchProfile();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePasswordUpdate = async () => {
    if (passwordToastFlag.current) return; // Prevent toast from firing multiple times

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required!");
      passwordToastFlag.current = true; // Prevent further toasts
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      passwordToastFlag.current = true; // Prevent further toasts
      return;
    }

    try {
      const response = await fetch("https://dangal.gocoolcare.com/user/upDatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg || "Password updated successfully");
        closeModal();
      } else {
        toast.error(data.msg || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred. Please try again.");
    }

    passwordToastFlag.current = true; // Mark as done, prevent future toasts until reset
  };

  const handleProfileUpdate = async () => {
    if (profileToastFlag.current) return; // Prevent toast from firing multiple times

    if (!name || !email) {
      toast.error("Name and Email cannot be empty!");
      profileToastFlag.current = true; // Prevent further toasts
      return;
    }

    try {
      const response = await fetch("https://dangal.gocoolcare.com/user/upDateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Profile updated successfully" );
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again.");
    }

    profileToastFlag.current = true; // Mark as done, prevent future toasts until reset
  };

  // Function to reset toast flags in case the user needs to trigger a new toast
  const resetToastFlags = () => {
    profileToastFlag.current = false;
    passwordToastFlag.current = false;
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
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)} 
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
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="form_control">
                <label htmlFor="NewPassword">New Password</label>
                <input
                  type="password"
                  id="NewPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form_control">
                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="ConfirmPassword"
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

      <ToastContainer position="top-center" autoClose={2000} closeOnClick />
    </>
  );
};

export default Profile;
