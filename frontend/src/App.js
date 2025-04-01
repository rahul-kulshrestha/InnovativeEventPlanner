import "./App.css";
import Header from "./components/common/header/Header";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "./components/about/About";
import Destinations from "./components/alldestinations/Destinations";
import Team from "./components/team/Team";
import Faq from "./components/faq/Faq";
import Blog from "./components/blog/Blog";
import BlogDetail from "./components/blog/BlogDetail";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserState from "./context/UserState";
import Profile from "./components/profile/Profile";
import DestinationDetail from "./components/alldestinations/DestinationDetail";
import DestinationBooking from "./components/alldestinations/DestinationBooking";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Login function
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <UserState>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/destinations" element={<Destinations />} />
            <Route
              exact
              path="/destinations/:id"
              element={<DestinationDetail />}
            />
            <Route
              exact
              path="/book-now/:id"
              element={
                isAuthenticated ? (
                  <DestinationBooking />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route exact path="/team" element={<Team />} />
            <Route exact path="/faqs" element={<Faq />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:id" element={<BlogDetail />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route
              exact
              path="/profile"
              element={
                isAuthenticated ? <Profile signout={logout}/> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/profile" /> : <Login signin={login} />
              }
            />
            <Route
              exact
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/profile" /> : <Register signin={login}/>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </UserState>
    </>
  );
}

export default App;
