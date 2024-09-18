import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Alert } from "react-bootstrap";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import imageLogin from "../../assets/loginimg.jpg";
import "./login.sass";

const Login = () => {
  const url = "http://nutri-delivery.vercel.app/backend/auth/login.php";
  const [validEmail, setValidEmail] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("primary");

  const validateEmail = (event) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(regex.test(event.target.value)); // Valida el correo electrónico y actualiza el estado de validación
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include', // Asegúrate de incluir las credenciales en la solicitud
    });

    const data = await response.json();
    if (!data.success) {
      setAlertMessage(data.error);
      setAlertVariant("primary");
    } else {
      window.location.href = "http://nutri-delivery.vercel.app/";
    }
  };

  return (
    <>
      <HeaderComponent />
      <Container className="container">
        <Row md={3} className="row">
          <Col className="image">
            <img src={imageLogin} alt="Imagen" />
          </Col>
          <Col className="inicia">
            <h1 className="title">Iniciar sesión</h1>
            {alertMessage && (
              <Alert variant={alertVariant} onClose={() => setAlertMessage("")} dismissible>
                {alertMessage}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu email"
                  className={`text ${!validEmail ? "is-invalid" : ""}`}
                  name="email"
                  onBlur={(e) => validateEmail(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Correo inválido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLink">
                <Form.Label className="text-muted">
                  ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                </Form.Label>
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

