import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderComponent from '../../components/Header/header';
import FooterComponent from '../../components/Footer/footer';
import CardPlato from '../../components/CardPlato/cardPlato';
//import useParams from 'react-router-dom';
//import { useEffect, useState } from 'react';
//import getPlatos from '../../util/getPlatos.php';
import './listaPlatos.sass';

const ListaPlatos = () => {
    //const [platos, setPlatos] = useState([]);
    //const { restauranteId } = useParams('restauranteId');

    // useEffect(() => {
    //     const fetchPlatos = async () => {
    //         let platosData = [];
    //         if (restauranteId) {
    //             platosData = await getPlatos(restauranteId);
    //         } else {
    //             platosData = await getPlatos();
    //         }
    //         setPlatos(platosData);
    //     };
    //     fetchPlatos();
    // }, [restauranteId]);

    return (
        <>
            <HeaderComponent />

            {/*<Container className="mt-5 mb-5 lista-platos-container" style={{ marginTop: "60px" }}>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {platos.map((plato) => (
                        <Col key={plato.id} xs={12}>
                            <CardPlato id={plato.id} nombre={plato.nombre} precio={plato.precio} img={plato.img} descripcion={plato.descripcion} />
                        </Col>
                    ))}
                </Row>
                </Container>*/}
            <FooterComponent />
        </>
    );
}

export default ListaPlatos;
