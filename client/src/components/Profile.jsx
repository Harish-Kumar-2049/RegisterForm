import React from "react";
import "../assets/style.css"
const Profile = ({ userData }) => {
  if (!userData) {
    return <p>No user data available. Please register first.</p>;
  }

  const { username, email, department, projectLinks, description, profileImage } = userData;

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profileImage && (
        <div>
          <img src={URL.createObjectURL(profileImage)} alt="Profile" />
        </div>
      )}
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Project Links:</strong> {projectLinks}</p>
      <p><strong>Description:</strong> {description}</p>
      
    </div>
  );
};

export default Profile;
