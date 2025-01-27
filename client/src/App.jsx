import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import axios from "axios";
import './assets/style.css'; // Make sure the style is properly applied from the CSS file.

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (formData) => {
    // Save the submitted data to local state
    setUserData(formData);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<SignUp onFormSubmit={handleFormSubmit} />}
          />
          <Route path="/profile" element={<Profile userData={userData} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
