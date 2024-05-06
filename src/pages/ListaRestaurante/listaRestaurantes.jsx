import React from "react";
import CardRestaurante from "../../components/CardRestaurante/cardRestaurante";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "./listaRestaurantes.sass";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = React.useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = React.useState("Madrid");

  React.useEffect(() => {
    const ciudades = {
      Madrid: [
        {
          id: 1,
          nombre: "El Cómplice",
          direccion: "Calle de la Montera 12",
          horarioApertura: "11:00",
          horarioCierre: "22:00",
        },
        {
          id: 2,
          nombre: "Los Tres Cochinos",
          direccion: "Plaza del sol 1",
          horarioApertura: "10:00",
          horarioCierre: "22:00",
        },
      ],
      Barcelona: [
        {
          id: 3,
          nombre: "El Pichón",
          direccion: "Avenida de América 34",
          horarioApertura: "10:00",
          horarioCierre: "22:00",
        },
        {
          id: 4,
          nombre: "El Gato Negro",
          direccion: "Calle de las Palomas 17",
          horarioApertura: "11:00",
          horarioCierre: "23:00",
        },
      ],
      Valencia: [
        {
          id: 5,
          nombre: "Los Gorditos",
          direccion: "Paseo de la Mar 1",
          horarioApertura: "12:00",
          horarioCierre: "22:00",
        },
        {
          id: 6,
          nombre: "La Tortilla",
          direccion: "Calle de las Flores 4",
          horarioApertura: "10:00",
          horarioCierre: "22:00",
        },
      ],
      Sevilla: [
        {
          id: 7,
          nombre: "El Puchero",
          direccion: "Plaza Nueva 2",
          horarioApertura: "11:00",
          horarioCierre: "22:00",
        },
        {
          id: 8,
          nombre: "El Ciervo",
          direccion: "Calle de las Huertas 7",
          horarioApertura: "10:00",
          horarioCierre: "22:00",
        },
      ],
      Zaragoza: [
        {
          id: 9,
          nombre: "La Casa de las Migas",
          direccion: "Calle de las Torres 6",
          horarioApertura: "12:00",
          horarioCierre: "22:00",
        },
        {
          id: 10,
          nombre: "La Batana",
          direccion: "Plaza de los Naranjos 1",
          horarioApertura: "11:00",
          horarioCierre: "23:00",
        },
      ],
    };

    setRestaurantes(ciudades[ciudadSeleccionada] || []);
  }, [ciudadSeleccionada]);

  return (
    <>
      <HeaderComponent />
      <Container>
        <Form.Select
          className="ciudad-seleccionada"
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
