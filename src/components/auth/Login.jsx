// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = ({ setIsLoggingIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);
    setLoading(true);

    try {
      const user = await login(email, password);

      if (user) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
        setIsLoggingIn(false);
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setIsLoggingIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </>
  );
};

export default Login;
