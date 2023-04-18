import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

function GameLoginForm() {
    const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:8081/api/admin/gamelogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    navigate("/game",{replace:true})
  };

  return (
    <form onSubmit={handleSubmit}>
        <h4>Game Sign in</h4>
      <label htmlFor="password">
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default GameLoginForm;
