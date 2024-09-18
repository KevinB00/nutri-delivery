import React from "react";
import { useLocation } from "react-router-dom";
import CardRestaurante from "../../components/CardRestaurante/cardRestaurante";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./listaRestaurantes.sass";

const ListaRestaurantes = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCity = queryParams.get('ciudad') || "Madrid";

  const url =
    "https://nutri-delivery.vercel.app/backend/actions/read/getAllRestaurants.php";
  const [restaurantes, setRestaurantes] = React.useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = React.useState(initialCity)

  React.useEffect(() => {
    fetch(`${url}?ciudad=${ciudadSeleccionada}`)
      .then((response) => response.json())
      .then((data) => setRestaurantes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [ciudadSeleccionada]);

  return (
    <>
      <HeaderComponent />
      <Container>
        <Form.Select
          className="mt-3 ciudad-seleccionada"
          value={ciudadSeleccionada}
          onChange={(e) => setCiudadSeleccionada(e.target.value)}
        >
          {["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza"].map(
            (ciudad) => (
              <option key={ciudad} value={ciudad}>
                {ciudad}
              </option>
            )
          )}
        </Form.Select>
      </Container>
      <Container className="listado-restaurantes">
        {restaurantes.map((restaurante) => (
          <CardRestaurante
            key={restaurante.id}
            id={restaurante.id}
            nombre={restaurante.nombre}
            direccion={restaurante.direccion}
            telefono={restaurante.telefono}
            horarioApertura={restaurante.horarioApertura}
            horarioCierre={restaurante.horarioCierre}
          />
        ))}
      </Container>
      <FooterComponent />
    </>
  );
};

export default ListaRestaurantes;
