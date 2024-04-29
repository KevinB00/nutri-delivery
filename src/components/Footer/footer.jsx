import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./footer.sass";
const FooterComponent = () => {
  return (
    <Container fluid className="footer p-5">
      <Row className="align-items-center">
        <Col>
          <Navbar.Brand href="home">
            <img
              src="./src/assets/logo.png"
              width="100"
              height="70"
              className="d-inline-block align-top logo"
              alt="Logo"
            />
          </Navbar.Brand>
        </Col>
        <Col>
          <Nav className="flex-column align-items-center justify-content-center interes">
            <Nav.Link href="#">ENLACES DE INTERÉS</Nav.Link>
            <Nav.Link>Acerca de nosotros</Nav.Link>
            <Nav.Link>Contacto</Nav.Link>
            <Nav.Link>Empleo</Nav.Link>
          </Nav>
        </Col>
        <Col>
          <Nav className="flex-column align-items-center justify-content-center">
            <Nav.Link href="#">LEGAL</Nav.Link>
            <Nav.Link>Condiciones de uso</Nav.Link>
            <Nav.Link>Política de privacidad</Nav.Link>
            <Nav.Link>Política de Cookies</Nav.Link>
          </Nav>
        </Col>
        <Col>
          <Nav className="flex-column flex-wrap align-items-center">
            <Nav.Link href="#">REDES SOCIALES</Nav.Link>
            <Nav className="flex-row flex-wrap align-items-center">
              <Nav.Link>
                <i className="bi bi-facebook" style={{ fontSize: "30px" }}></i>
              </Nav.Link>
              <Nav.Link>
                <i className="bi bi-twitter-x" style={{ fontSize: "30px" }}></i>
              </Nav.Link>
              <Nav.Link>
                <i className="bi bi-instagram" style={{ fontSize: "30px" }}></i>
              </Nav.Link>
            </Nav>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterComponent;
