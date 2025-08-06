import React, { useState } from 'react';

const SignUp = ({ toggleForm }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = { id: Date.now(), fullName, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Switch to the login form after successful sign-up
    toggleForm(); 
  };

  return (
    <>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSignUp}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <span onClick={toggleForm}>Login</span>
      </p>
    </>
  );
};

export default SignUp;