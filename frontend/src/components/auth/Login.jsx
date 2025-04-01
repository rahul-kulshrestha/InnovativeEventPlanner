import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Back from "../common/back/Back";
import "./login.css";
const apiUrl = process.env.REACT_APP_API_URL;

const Login = ({ signin }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
    // console.log(event.target.value)
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", login);
    try {
      const response = await fetch(`${apiUrl}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      signin(data.token.access);
      console.log("Success:", data.token);
      setLogin({
        email: "",
        password: "",
      });
      setErrors([]);
      alert("Login Successfully");
      navigate('/profile');
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Back title="Login" />
      <section className="contacts padding">
        <div className="container shadow">
          <div className="">
            <form onSubmit={handleOnSubmit} className="login mt-5">
              <h2>Welcome, User!</h2>
              <p>Please log in</p>
              {Object.keys(errors).length > 0 && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                  <ul>
                    {Object.entries(errors).map(([field, messages]) => (
                      <li key={field}>{messages.join(", ")}</li>
                    ))}
                  </ul>
                </div>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleOnChange}
                value={login.email}
                required
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleOnChange}
                value={login.password}
                required
              />
              <input type="submit" value="Log In" />
              <div class="links">
                {/* <a href="#">Forgot password</a> */}
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
