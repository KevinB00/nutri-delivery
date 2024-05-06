import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/logo.png';
import "./header.sass"
const HeaderComponent = () => {

    return (
        <Navbar className="navbar header" bg="primary" expand="lg" >
            <Container fluid>
                <Navbar.Brand href="/home">
                    <img
                        src={logo}
                        width="100"
                        height="70"
                        className="d-inline-block align-top logo"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Principal</Nav.Link>
                        <Nav.Link href="/community">Comunidad</Nav.Link>
                        <NavDropdown title="Listas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/restaurantes">Restaurantes</NavDropdown.Item>
                            <NavDropdown.Item href="/platos">Platos</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button className="btn-login" variant="tertiary" href="/login">Iniciar sesión</Button>
                    <Form className="d-flex search">
                        <Form.Control type="text" placeholder="Platos, Restaurantes..." className="me-2" />
                        <Button variant="outline-secondary"><i className="bi bi-search"></i></Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderComponent