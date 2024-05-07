import './perfil.sass';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import HeaderComponent from '../../components/Header/header';
import FooterComponent from '../../components/Footer/footer';
const Perfil = () => {

  
  return (
    <>
    <HeaderComponent />
    <Container fluid className="perfil-container">
      <Container className="perfil-datos">
        <Tabs defaultActiveKey="datos" id="uncontrolled-tab-example">
          <Tab eventKey="datos" title="Datos">
            <div className="perfil-datos-datos">
              <h1>Datos</h1>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Ingresa tu email" />
                </Form.Group>
                <Button variant="outline-tertiary" type="submit">
                  Modificar
                </Button>
              </Form>
              <Form>
                <Form.Group className="mt-3 mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Ingresa tu nueva contraseña" />
                </Form.Group>
                <Button variant="outline-tertiary" type="submit">
                  Cambiar contraseña
                </Button>
              </Form>
            </div>
            <div className="verificar-correo">
              <p>Para cambiar de contraseña, se te enviará un enlace a tu correo.</p>
            </div>
          </Tab>
          <Tab eventKey="historial" title="Historial">
            <div className="perfil-datos-historial">
              <h1>Historial</h1>
              <p>Pedidos realizados:</p>
            </div>
          </Tab>
          <Tab eventKey="post" title="Posts">
            <div className="perfil-datos-post">
              <h1>Posts</h1>
              <p>Posts publicados:</p>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </Container>
    <FooterComponent />
    </>
    
  );
}

export default Perfil