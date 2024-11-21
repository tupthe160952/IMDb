import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../components/UserContext";
import "../styles/UserProfile.css";
import Watchlist from "../components/Watchlist";
import Header from "../components/Header";
import Footer from "../components/Footer";



const UserProfile: React.FC = () => {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Fetch user information
  const fetchUserInfo = async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:9999/users/${user.id}`);
        setUserInfo(response.data);
        setName(response.data.name); // Thiết lập giá trị cho name
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  // Fetch user's watchlist
  const fetchWatchlist = async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:9999/watchlist`, {
          params: { userId: user.id },
        });
        setWatchlist(response.data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchWatchlist();
  }, [user]);

  const handleUpdateProfile = async () => {
    setError(""); // Reset error message

    if (!user) {
      setError("User  not found.");
      return;
    }

    // Validate password length
    if (newPassword.length > 0 && newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare the data to update
    const updatedData: any = { name }; // Chỉ cập nhật tên
    if (newPassword) {
      updatedData.password = newPassword; // Chỉ cập nhật mật khẩu nếu có
    }

    // Update user info in backend (JSON Server)
    try {
      await axios.patch(`http://localhost:9999/users/${user.id}`, updatedData);
      alert("Profile updated successfully!");
      setIsEditing(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="user-profile-container">
      <Header />
      <div className="user-profile-content">
        {userInfo && (
          <div className="user-profile-info">
            <h2 className="user-profile-info-title">Account Information</h2>
            <p style={{marginBottom:'22px',marginTop:'18px'}}><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p  style={{marginBottom:'22px',marginTop:'18px'}}><strong>Date of creation:</strong> {userInfo.createdAt}</p>
            <button className="user-profile-edit-button" onClick={() => setIsEditing(prev => !prev)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            {isEditing && (
              <div className="user-profile-edit-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="user-profile-input"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="user-profile-input"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="user-profile-input"
                />
                <button className="user-profile-update-button" onClick={handleUpdateProfile}>Update Profile</button>
                {error && <p className="user-profile-error">{error}</p>}
              </div>
            )}
          </div>
        )}
        <div className="user-profile-watchlist">
          <div className="user-profile-watchlist-content"><Watchlist /></div>
        </div>
      </div>
      <div className="footer-user-profile">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default UserProfile;