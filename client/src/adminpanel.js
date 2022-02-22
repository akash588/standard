
import { Button, Col, Row, Card, } from 'react-bootstrap'
import './admin.css';
import Header from './components/header';
import Fileupload from './components/fileuploadgmail';




import Form from 'react-bootstrap/Form'


import { useState } from 'react';
const Axios = require('axios');


function Adminpanel() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [keyword, setkeyword] = useState(null);
  const postData = () => {

    const data = {
      email,
      password,
      keyword
    };
    Axios.post("http://localhost:7008/create", data).then((res) => {
      window.location.reload();
    });
  };


  return (

    <div className="admin">
      <Header />

      <div className="mainContainer" >
        <div style ={{display:'flex',justifyContent:'center'}}><Fileupload /></div>
      
       
      </div>



    </div>

  );
}




export default Adminpanel;