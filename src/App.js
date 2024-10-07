import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); // true for sign-up, false for sign-in
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Gửi yêu cầu đăng ký
        const response = await axios.post('http://localhost:5000/api/signup', {
          username,
          password,
        });
        alert(response.data.message);
      } else {
        // Gửi yêu cầu đăng nhập
        const response = await axios.post('http://localhost:5000/api/signin', {
          username,
          password,
        });
        alert(response.data.message);
        console.log('Token:', response.data.token);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <p>HELLO WORLD</p>
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        Switch to {isSignUp ? 'Sign In' : 'Sign Up'}
      </button>
    </div>
  );
}

export default App;