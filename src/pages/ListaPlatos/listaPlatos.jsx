import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderComponent from '../../components/Header/header';
import FooterComponent from '../../components/Footer/footer';
import CardPlato from '../../components/CardPlato/cardPlato';
import './listaPlatos.sass';

const ListaPlatos = () => {
  const { restauranteId } = useParams();
  const [platos, setPlatos] = useState([]);
  const baseUrl = "http://nutri-delivery.vercel.app/backend/actions/read/";

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const url = restauranteId 
          ? `${baseUrl}getPlatosByRestaurant.php?id_restaurante=${restauranteId}`
          : `${baseUrl}getAllPlatos.php`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setPlatos(data);
        } else {
          console.error('Error en la solicitud:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchPlatos();
  }, [restauranteId]);

  return (
    <>
      <HeaderComponent />
      <Container className="mt-5 mb-5 lista-platos-container">
        <Row xs={1} md={2} lg={3} className="g-4">
          {platos.map((plato) => (
            <Col key={plato.id} xs={12}>
              <CardPlato 
                id={plato.id} 
                nombre={plato.nombre} 
                precio={plato.precio} 
                img={`http://nutri-delivery.vercel.app/${plato.imagen_url}`} 
                descripcion={`${plato.calorias} cal | ${plato.proteinas}g proteínas | ${plato.carbohidratos}g carbohidratos | ${plato.grasas}g grasas`} 
              />
            </Col>
          ))}
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
}

export default ListaPlatos;
