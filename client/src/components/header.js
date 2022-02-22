import { Navbar, Nav, Container,Button } from 'react-bootstrap'


function Header() {
  return (
    <div className="admin">


      <>
      <Navbar bg="light" variant="light" style={{position:"fixed", width:"100vw"}}>

          <Container>

            <Navbar.Brand href="/">Email Automation</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/gmail">Gmail</Nav.Link>
              {/* <Nav.Link href="/upload">Gmail Upload</Nav.Link> */}

              <Nav.Link href="/yahoo">Yahoo</Nav.Link>

            </Nav>
            <Nav>


              {/* <Nav.Link href="/"><button class="button"><span>Logout</span></button> </Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>

       


      </>




    </div>

  );


}

export default Header;