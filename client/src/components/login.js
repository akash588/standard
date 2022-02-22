import React from "react";
// import { useDispatch } from 'react-redux';
import { useState } from "react";
// import {login} from '../features/userSlice'

import { Col, Row, Container, Form, Card, Button } from "react-bootstrap";
import HeaderLogin from "./headerlogin";
import "./login.css";

async function postData(credentials) {
  return fetch("http://localhost:7006/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function Login({ setToken }) {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const token = await postData({
    email,
    password,
  });
  setToken(token);

  //  Axios.post("http://localhost:7000/login", data).then((res) => {

  // }
  // );

  return (
    <div className="login" style={{ display: "flex" }}>
      <Container fluid>
        <HeaderLogin />

        <Card
          style={{
            border: "1px solid black",
            width: "50vw",
            height: "30vh",
            padding: "10px",
            // marginTop: "4rem",
            // marginBottom: "4rem",
            marginLeft: "20rem",
          }}
        >
          <Card.Title style={{ display: "flex", justifyContent: "center" }}>
            Sign in
          </Card.Title>
          <Row>
            <Col>
              <Form className="form">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                  placeholder="email"
                  value={email || ""}
                  onChange={(e) => setemail(e.target.value)}
                  style={{ padding: "1px", marginTop: "1rem" }}
                >
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="email" placeholder="Email" />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                  placeholder="password"
                  value={password || ""}
                  onChange={(e) => setpassword(e.target.value)}
                  style={{ padding: "1px", marginTop: "1rem" }}
                >
                  <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="Password" />
                  </Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button
                        type="submit"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "1rem",
                          marginLeft: "4rem",
                        }}
                        onClick={() => postData()}
                      >
                        Log in
                      </Button>
                    </Col>
                  </Form.Group>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>

    /* <input type="email" placeholder="email" value={email || ''} onChange={e => setemail(e.target.value)}  />
      <input type="password" placeholder="password"  value={password || ''} onChange={e => setpassword(e.target.value)} />
      <button type="submit" className="submit__btn" onClick={(e) =>{handleSubmit(e)}}> Submit</button> */
  );
}

export default Login;
