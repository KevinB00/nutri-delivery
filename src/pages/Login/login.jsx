import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import "./login.sass";

const Login = () => {
  return (
    <>
      <HeaderComponent />
      <Container className="container">
        <Row md={3} className="row">
          <Col className="image">
            <img
              src="./src/assets/login-img.jpg"
              alt="Imagen"
            />
          </Col>
          <Col className="inicia">
            <h1 className="title">Iniciar sesión</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre de usuario o email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre de usuario o email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLink">
                <Form.Label className="text-muted">
                  ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Recuérdame" />
              </Form.Group>
              <Button variant="outline-tertiary" type="submit">
                Iniciar sesión
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
};

export default Login;
