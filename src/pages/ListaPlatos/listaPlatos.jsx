import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HeaderComponent from '../../components/Header/header';
import FooterComponent from '../../components/Footer/footer';
import CardPlato from '../../components/CardPlato/cardPlato';
import './listaPlatos.sass';

const ListaPlatos = () => {
    return(
        <>
            <HeaderComponent />
            
            <Container className="mt-5 mb-5 lista-platos-container" style={{marginTop: "60px"}}>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {[
                        { id: 1, nombre: 'Pollo al curry', precio: 15.99, img: 'https://via.placeholder.com/250x150', descripcion: 'Pollo al curry de la mejor cocina' },
                        { id: 2, nombre: 'Pizza', precio: 22.50, img: 'https://via.placeholder.com/250x150', descripcion: 'Pizza caliente y deliciosa' },
                        { id: 3, nombre: 'Hamburguesa', precio: 8.99, img: 'https://via.placeholder.com/250x150', descripcion: 'La clásica hamburguesa' },
                        { id: 4, nombre: 'Pizza vegana', precio: 19.99, img: 'https://via.placeholder.com/250x150', descripcion: 'Pizza vegana con todo' }
                    ].map((plato) => (
                        <Col key={plato.id} xs={12}>
                            <CardPlato id={plato.id} nombre={plato.nombre} precio={plato.precio} img={plato.img} descripcion={plato.descripcion} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <FooterComponent />
        </>
    )
}

export default ListaPlatos