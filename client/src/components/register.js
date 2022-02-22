import React, { useState } from 'react';
import {Col, Row,Form,Card,Button} from 'react-bootstrap'
import HeaderLogin from './headerlogin'
import { useHistory } from "react-router-dom";
import './login.css'
import Swal from "sweetalert2";  





async function registerUser(credentials) {
 return fetch('http://localhost:7006/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

 function Register({ setToken }) { 
 
  let history = useHistory();
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await registerUser({
      first_name,
      last_name,
      email,
      password
    });
   
    
    Swal.fire(token.message);
    if(token.message == "Sign up succesfully") {history.push("/login"); }
    
   }
  

  return(
    <div className="login">
        
            
              
             
              <HeaderLogin />
              <div className ="mainContainer" >
              
        <Card style={{display:'flex',justifyContent:'center',width: '45vw', height:'60vh',margin:'0 auto', float: 'none',background: '#d0d2d3' }}>
        <Card.Title style={{textAlign: 'center'}}>Sign Up</Card.Title>     
  <Row>
    <Col>
    <Form className="form" onSubmit={handleSubmit}>
    <Form.Group as={Row}  controlId="formHorizontalEmail" placeholder="lastname" value={first_name || ''} onChange={e => setfirst_name(e.target.value)}  style={{display:'flex',justifyContent:'center',padding:'1px',marginTop:'1rem'}} >
    <Form.Label column sm={2} className="Label">
      First name
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="firstname" placeholder="firstname" />
    </Col>
  </Form.Group>
  <Form.Group as={Row} controlId="formHorizontalEmail" placeholder="lastname" value={last_name || ''} onChange={e => setlast_name(e.target.value)} style={{display:'flex',justifyContent:'center',padding:'1px',marginTop:'1rem'}} >
  <Form.Label column sm={2} className="Label">
      Last name
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="Lastname" placeholder="Lastname" />
    </Col>
  </Form.Group>
    <Form.Group as={Row}  controlId="formHorizontalEmail" placeholder="email" value={email || ''} onChange={e => setemail(e.target.value)} style={{display:'flex',justifyContent:'center',padding:'1px',marginTop:'1rem'}} >
    <Form.Label column sm={2} className="Label">
      Email
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="email" placeholder="Email" />
    </Col>
  </Form.Group>

  <Form.Group as={Row}  controlId="formHorizontalPassword" placeholder="password"  value={password || ''} onChange={e => setpassword(e.target.value)}  style={{display:'flex',justifyContent:'center',padding:'1px',marginTop:'1rem'}} >
  <Form.Label column sm={2} className="Label">
     Password
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="password" placeholder="Password" />
    </Col>
    <Form.Group as={Row} style={{textAlign: 'center',marginTop:'1em'}} >
    <Col sm={{ span: 10, offset: 2}}>
  
      <Button type="submit"style={{marginRight: '4em'}} className="submit" >Register</Button>
      <a href="/login" class="registernavigate">Already have an account? Sign in</a>
      
    </Col>
  </Form.Group>
  </Form.Group>
        </Form></Col>
  </Row>
</Card>
</div>
</div>
  )
}
export default Register




