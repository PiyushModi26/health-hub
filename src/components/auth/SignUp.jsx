import React, { useState } from 'react';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    // For this design, we'll just show a success message
    // In a real app, you'd likely auto-login or redirect
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = { id: Date.now(), fullName, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Sign up successful! Please switch to the Sign In panel to log in.');
  };

  return (
    <>
      <h2>Create Account</h2>
      <form onSubmit={handleSignUp}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;