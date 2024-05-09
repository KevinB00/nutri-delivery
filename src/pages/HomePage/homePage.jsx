import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import "./homePage.sass";
const HomePage = () => {
  return (
    <Container fluid className="homePage">
      <Row>
        <HeaderComponent />
      </Row>
      <Row className="text-center mt-5">
        <Col className="main">
          <h1 className="font-monospace titulos">
            PIDE A DOMICILIO Y COME SALUDABLE
          </h1>
          <Container className="mt-5 mb-5 d-flex justify-content-center">
            <Row className="d-flex align-items-center">
              <Col>
                <Card className="card-home" border="tertiary" style={{ width: "18rem", marginRight: "6rem" }}>
                  <Card.Body>
                    <Card.Text className="card-text text">
                      A domicilio cuando quiera desde su casa. Nos aseguramos de
                      que llegue la comida fresca lo más pronto posible, para
                      que obtenga la mejor experiencia para comer saludable o
                      cuando necesite este servicio
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <i
                  className="bi bi-buildings-fill"
                  style={{
                    fontSize: "70px",
                    marginRight: "8rem",
                    marginTop: "5rem",
                  }}
                ></i>
              </Col>
              <Col>
                <Card className="card-home" border="tertiary" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Text className="card-text text">
                      Únase a la mejor comunidad donde podrá informarse y
                      aprender nuevos sabores con los que podrá seguir
                      disfrutando de la comida y de la mejor manera. En nuestra
                      comunidad podrá obtener los recursos necesarios para
                      conseguir su objetivo
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <h3 className="font-monospace titulos">
            PRINCIPALES RESTAURANTES DE ESPAÑA
          </h3>
          <Row className="mt-3 mb-5 buttons">
            <ButtonGroup
              vertical
              aria-label="City buttons"
              className="d-flex align-items-center"
            >
              <Button variant="tertiary" href="#">
                Madrid
              </Button>
              <Button variant="tertiary" href="#">
                Barcelona
              </Button>
              <Button variant="tertiary" href="#">
                Valencia
              </Button>
              <Button variant="tertiary" href="#">
                Sevilla
              </Button>
              <Button variant="tertiary" href="#">
                Zaragoza
              </Button>
            </ButtonGroup>
          </Row>
          <h3 className="font-monospace titulos">COMUNIDAD</h3>
          <i
            className="bi bi-chat-left-text-fill mt-3 chat"
            style={{ fontSize: "40px" }}
          ></i>
          <Container className="d-flex justify-content-center align-items-center mb-5">
            <Row>
              <Col>
                <Card border="tertiary" className="mb-5 card-home" style={{ width: "18rem", marginRight: "80px"}}>
                  <Card.Body>
                    <Card.Text className="card-text text">
                      Comparte tus comidas en nuestra comunidad, hazte con
                      descuentos de los restaurantes aprende recetas y más.
                    </Card.Text>
                    <Button variant="primary" href="community">
                      Únete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="card-home" border="tertiary" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Text className="card-text text">
                      Únase a la mejor comunidad donde podrá informarse y
                      aprender nuevos sabores con los que podrá seguir
                      disfrutando de la comida y de la mejor manera. En nuestra
                      comunidad podrá obtener los recursos necesarios para
                      conseguir su objetivo
                    </Card.Text>
                    <i
                      className="bi bi-heart-pulse-fill"
                      style={{ fontSize: "30px" }}
                    ></i>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <FooterComponent />
      </Row>
    </Container>
  );
};

export default HomePage;
