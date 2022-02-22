import { Navbar, Nav, Container } from 'react-bootstrap'











function Headerlogin() {
  return (
    <div className="admin">


      <>
        
        <Navbar bg="light" variant="light" style={{position:"fixed", width:"100vw"}}>
    <Container>
    <Navbar.Brand href="/login">Email Automation</Navbar.Brand>
    
    </Container>
  </Navbar>


      </>




    </div>

  );


}

export default Headerlogin;