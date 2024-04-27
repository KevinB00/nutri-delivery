
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import HeaderComponent from '../components/Header/header';
import FooterComponent from '../components/Footer/footer';
const CommunityPage = () => {
    
    return (
      <>
      <HeaderComponent />
      <Container>
        <h1>Comunidad</h1>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Publicación 1</Card.Title>
                <Card.Text>
                  Contenido de la publicación 1
                </Card.Text>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Publicación 2</Card.Title>
                <Card.Text>
                  Contenido de la publicación 2
                </Card.Text>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <FooterComponent />
      </>
    );
  }
  
  export default CommunityPage;