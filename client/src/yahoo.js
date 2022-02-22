
import {Button, Col, Row, Card,} from 'react-bootstrap'
import './admin.css';
import Header  from './components/header';



import Form from 'react-bootstrap/Form'


import { useState } from 'react';
const Axios = require('axios');


  function Adminpanel () { 
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [keyword, setkeyword] = useState(null);
  const postData = () => {
    
  const data = {
    email,
    password,
    keyword
  };
  Axios.post("http://localhost:7000/create1", data).then((res) => {
    window.location.reload();
  });
};
  
 
   return(
     
       <div className ="admin">
         <Header />
           
           <div className ="mainContainer" >
          
           <Card style={{display:'flex',justifyContent:'center',width: '45vw', height:'70vh',padding: '10px',margin:'0 auto', float: 'none', marginTop:'3rem',marginBottom:'2rem',background: '#d0d2d3' }}>
           
           <Card.Title style={{textAlign: 'center'}}>Yahoo</Card.Title>
    <Row>
    <Col>
           <Form className="form">
    <Form.Group as={Row}  controlId="formHorizontalEmail" value={email} label="Name"  onChange={(e) => setemail(e.target.value)} style={{display:'flex',justifyContent:'center',padding:'1px',marginTop:'1rem'}}>
    <Form.Label column sm={2} className="Label">
      Email
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="email" placeholder="Email" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} controlId="formHorizontalPassword" value={password} label="Name"  onChange={(e) => setpassword(e.target.value)} style={{display:'flex',justifyContent:'center',padding:'1px',marginTop:'1rem'}}>
  <Form.Label column sm={2} className="Label">
     Password
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="password" placeholder="Password" />
    </Col>
  </Form.Group>
  <Form.Group as={Row}  controlId="formHorizontalEmail" value={keyword} label="Name"  onChange={(e) => setkeyword(e.target.value)} style={{display:'flex',justifyContent:'center',padding:'1px',marginTop:'1rem'}}>
  <Form.Label column sm={2} className="Label">
      Keyword
    </Form.Label>
    <Col sm={8}>
      <Form.Control type="text" placeholder="Keyword" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} style={{textAlign: 'center',marginTop:'1em'}} >
    <Col sm={{ span: 10, offset: 2 }}>
      
      {/* <Button type="submit"style={{marginTop:'0.1rem',display:'flex',justifyContent:'center',alignContent:'center',marginLeft: '12rem'}} onClick={() => postData()} >Submit</Button> */}
      <Button type="submit" style={{marginRight: '4em'}} onClick={() => postData()}  >Submit</Button>
      
    </Col>
  </Form.Group>
</Form>
</Col>
  </Row>
</Card>
</div>


           
       </div>

   );
 }




export default Adminpanel;