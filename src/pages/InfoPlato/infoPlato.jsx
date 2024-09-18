import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FooterComponent from "../../components/Footer/footer";
import HeaderComponent from "../../components/Header/header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import "./infoPlato.sass";

const InfoPlato = () => {
  const { platoId } = useParams();
  const [plato, setPlato] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    const fetchPlato = async () => {
      try {
        const response = await fetch(
          `https://nutri-delivery.vercel.app/backend/actions/read/getInfoPlato.php?id_plato=${platoId}`
        );
        const data = await response.json();
        setPlato(data);
      } catch (error) {
        console.error("Error al obtener la información del plato:", error);
      }
    };
    fetchPlato();
  }, [platoId]);
  const validarDireccion = async (direccion) => {
    try {
      const respuesta = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${direccion}&format=json&addressdetails=1&limit=1`
      );
      const datos = await respuesta.json();

      if (datos.length > 0) {
        const infoDireccion = datos[0];
        const pais = infoDireccion.address.country;

        // Verificar si el país es España
        if (pais === "España") {
          return true;
        } else {
          console.log("La dirección no está en España");
          return false;
        }
      } else {
        console.log("Dirección no encontrada en OpenStreetMap");
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validarNumeroTelefono = (numeroTelefono) => {
    const regexNumeroTelefono = /^(\+34|0034|34)?[6|7|8|9]\d{8}$/;
    return regexNumeroTelefono.test(numeroTelefono);
  };

  const handleAddressChange = async (event) => {
    const direccion = event.target.value;
    setAddress(direccion);
    if (direccion.trim() !== "") {
      const isValid = await validarDireccion(direccion);
      setAddressError(!isValid);
    } else {
      setAddressError(false);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Enviando formulario...");
    setShowForm(false);
  };

  return (
    <>
      <HeaderComponent />
      <Container className="mt-5 plato-info">
        {plato ? (
          <>
            {/* Preview Image */}
            <Image
              src={`https://nutri-delivery.vercel.app/${plato.imagen_url}`}
              alt={plato.nombre}
              width={500}
              className="plato-preview"
              fluid
              rounded
            />

            {/* Title */}
            <h1 className="plato-title">{plato.nombre}</h1>

            {/* Description */}
            <p className="plato-description">{plato.descripcion}</p>

            {/* Nutritional Information */}
            <Container className="plato-nutrition-info">
              <Row>
                <Col xs={6} md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Calorías: {plato.calorias}</ListGroup.Item>
                    <ListGroup.Item>
                      Proteínas: {plato.proteinas}g
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Carbohidratos: {plato.carbohidratos}g
                    </ListGroup.Item>
                    <ListGroup.Item>Grasas: {plato.grasas}g</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Container>

            {/* Price */}
            <p className="plato-price">
              Precio: <strong>{plato.precio}€</strong>
            </p>

            {/* Button to order */}
            <Container>
              <Row>
                <Col className="text-center">
                  <Button
                    variant="primary"
                    className="plato-order-button"
                    onClick={handleShowForm}
                  >
                    Pedir el plato
                  </Button>
                </Col>
              </Row>
            </Container>

            {showForm && (
              <Form onSubmit={handleSubmit} className="mt-3 mb-5">
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Dirección:</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    required
                    value={address}
                    className={`text ${addressError ? "is-invalid" : ""}`}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Teléfono:</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Teléfono"
                    className={`text ${phoneError ? "is-invalid" : ""}`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => {
                      if (!validarNumeroTelefono(phone)) {
                        setPhoneError("El número de teléfono no es válido");
                      } else {
                        setPhoneError("");
                      }
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {phoneError &&
                      "Por favor, introduzca un número de teléfono válido (España: 9 dígitos, comenzando por 6, 7, 8 o 9)."}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCreditCard">
                  <Form.Label>Número de tarjeta de crédito:</Form.Label>
                  <Form.Control
                    type="text"
                    name="creditCard"
                    placeholder="Número de tarjeta de crédito"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 w-50 quantityInfo"
                  controlId="formQuantity"
                >
                  <Form.Label>Cantidad:</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    placeholder="Cantidad"
                    required
                    min={1}
                    step={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  />
                </Form.Group>
                <Button variant="tertiary" type="submit">
                  Enviar
                </Button>
              </Form>
            )}
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </Container>
      <FooterComponent />
    </>
  );
};
export default InfoPlato;
