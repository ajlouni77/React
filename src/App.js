import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import "./App.css";

const Navbar = ({ user, handleLogout }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      {!user ? (
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      ) : null}
    </ul>
    {user && (
      <div className="user-info">
        <span>Welcome, {user.displayName || user.email}!</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )}
  </nav>
);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
