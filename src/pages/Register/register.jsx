import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import "./register.sass";

const Register = () => {
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validarCiudad = async (city) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
      const data = await response.json();
      
      if (data.length > 0) {
        const cityInfo = data[0];
        const country = cityInfo.address.country;
        
        // Verificar si el país es España
        return country === 'España';
      } else {
        console.log('Ciudad no encontrada en OpenStreetMap');
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validarEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCityChange = async (event) => {
    const city = event.target.value;
    setCity(city);
    if (city.trim() !== "") {
      const isValid = await validarCiudad(city);
      setCityError(!isValid);
    } else {
      setCityError(false);
    }
  };

  const validateForm = () => {
    let valid = true;
    if (username.length < 4 || username.length > 15) {
      setUsernameError(true);
      valid = false;
    } else {
      setUsernameError(false);
    }
    if(!validarEmail(email)){
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }
    if (cityError) {
      valid = false;
    }
    if (password.length < 8 || password.length > 20) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      event.preventDefault();
    }
  };
  return (
    <>
      <HeaderComponent />
      <Container className="container" fluid>
        <Container className="bg-secondary mt-5 mb-5 p-5 w-75 registro">
          <i
            className="bi bi-person-circle align-middle ps-2 text-white"
            style={{ fontSize: "60px" }}
          />
          <h1 className="title text-white">Registro de usuario</h1>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className="text-white">Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                required
                className={`text ${usernameError ? "is-invalid" : ""}`}
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {!usernameError && "Por favor ingresa un nombre de usuario."}
                {usernameError && "Por favor ingresa un nombre de usuario de 4 a 15 caracteres."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label className="text-white">Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu ciudad"
                required
                className={`text ${cityError ? "is-invalid" : ""}`}
                value={city}
                onChange={handleCityChange}
              />
              <Form.Control.Feedback type="invalid">
                {!cityError && "Por favor ingresa una ciudad."}
                {cityError && "Por favor ingresa una ciudad válida de España."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                required
                className={`text ${emailError ? "is-invalid" : ""}`}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {!emailError && "Por favor ingresa un email."}
                {emailError && "Por favor ingresa un email valido."}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                required
                className={`text ${passwordError ? "is-invalid" : ""}`}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {!passwordError && "Por favor ingresa una contraseña."}
                {passwordError && "Por favor ingresa una contraseña de 8 a 20 caracteres."}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Registrarse<i className="bi bi-chevron-right ps-2 text-white"></i>
            </Button>
          </Form>
        </Container>
      </Container>
      <FooterComponent />
    </>
  );
};

export default Register;
