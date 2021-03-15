import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";

import { login } from "../actions/user.actions";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;

    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(username, password));
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center"></Header>
        <Form error={message !== ""} onSubmit={handleLogin} size="large">
          <Segment stacked>
            <Form.Input
              required
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />
            <Form.Input
              required
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
          <Message error content={message} />
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
