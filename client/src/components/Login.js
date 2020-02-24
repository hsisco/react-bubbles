import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = props => {
  const credentials = {
      username: '',
      password: ''
    }

  const [state, setState] = useState(credentials)

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", state)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push("/bubblepage");
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log('Invalid login:', err);
      });
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value});
  };

  return (
    <div className="Login" >
      <form onSubmit={handleSubmit} >
        <input 
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
        <input 
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button>Log In</button>
        <button onClick={() => localStorage.removeItem('token')}>Log Out</button>
      </form>
    </div>
  )
};

export default Login;