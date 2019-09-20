import React, { useState } from "react";
import axios from 'axios';
import { Form } from 'semantic-ui-react';

const Login = (props) => {

  const [login, setLogin] = useState({username: '', password: ''});

  const updateLogin = e => {
    setLogin({ ...login, [e.target.name]: e.target.value});
  };

  const logUser = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', login)
      .then(res => {
        localStorage.setItem('userToken', res.data.payload);
        props.history.push('/bubble');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <Form onSubmit = {logUser}>
        <Form.Group>
          <Form.Input
            placeholder="Username"
            name="username"
            value={login.username} 
            onChange={updateLogin}
          />
          <Form.Input
            type="password"
            placeholder="Password"
            name="password"
            value={login.username}
            onChange={updateLogin}
          />
          <Form.Button content="Log in" />
        </Form.Group>
      </Form>
      
    </div>
  );
};

export default Login;
