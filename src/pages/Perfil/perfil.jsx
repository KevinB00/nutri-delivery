import { useState, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import PostList from "../../components/PostList/postList";
import ComentarioList from "../../components/ComentarioList/comentarioList";
import "./perfil.sass";

const Perfil = () => {
  const [key, setKey] = useState("favoritos");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const id_usuario = getCookie("userId");
    setUserId(id_usuario);

    const fetchUserPosts = async () => {
      const response = await fetch(
        `http://nutri-delivery.vercel.app/backend/actions/read/getUserPosts.php?id_usuario=${id_usuario}`
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Error al obtener las publicaciones del usuario");
      }
    };

    const fetchUserFavorites = async () => {
      const response = await fetch(
        `http://nutri-delivery.vercel.app/backend/actions/read/getUserFavoritos.php?id_usuario=${id_usuario}`
      );
      if (response.ok) {
        const data = await response.json();
        setFavoritos(data);
      } else {
        console.error(
          "Error al obtener las publicaciones favoritas del usuario"
        );
      }
    };

    const fetchUserComments = async () => {
      const response = await fetch(
        `http://nutri-delivery.vercel.app/backend/actions/read/getUserComentarios.php?id_usuario=${id_usuario}`
      );
      if (response.ok) {
        const data = await response.json();
        setComentarios(data);
      } else {
        console.error("Error al obtener los comentarios del usuario");
      }
    };

    fetchUserPosts();
    fetchUserFavorites();
    fetchUserComments();
  }, [userId]);

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    if (name && (name.length < 4 || name.length > 15)) {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (email && !validarEmail(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }
    return valid;
  };

  const handleSubmitModify = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const data = {};
      if (name) data.name = name;
      if (email) data.email = email;
      if (newPassword) data.password = newPassword;
      data.userId = userId;

      fetch(
        `http://nutri-delivery.vercel.app/backend/actions/update/updateUsuario.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setShowSuccess(true);
          } else {
            setShowError(true);
          }
        })
        .catch(() => {
          setShowError(true);
        });
    }
  };

  return (
    <>
      <HeaderComponent />
      <Container fluid className="perfil-container">
        <Tab.Container id="left-tabs-example" defaultActiveKey="perfil">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="perfil">Perfil</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="comunidad">Comunidad</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="perfil">
                  <Container className="p-5 perfil-datos-datos">
                    <h1>Datos</h1>
                    {showSuccess && (
                      <Alert variant="tertiary">
                        Perfil actualizado con éxito.
                      </Alert>
                    )}
                    {showError && (
                      <Alert variant="primary">
                        Error al actualizar el perfil. Inténtalo de nuevo.
                      </Alert>
                    )}
                    <Form onSubmit={handleSubmitModify}>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Edita tu nombre"
                          className={`text ${nameError ? "is-invalid" : ""}`}
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {nameError &&
                            "Por favor ingresa un nombre de usuario de 4 a 15 caracteres."}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Edita tu email"
                          className={`text ${emailError ? "is-invalid" : ""}`}
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {emailError && "Por favor ingresa un email valido."}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button variant="outline-tertiary" type="submit">
                        Modificar <i className="bi-solid bi-pencil-square"></i>
                      </Button>
                    </Form>
                    <Form onSubmit={handleSubmitModify}>
                      <Form.Group
                        className="mt-3 mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          value={newPassword}
                          onChange={(event) =>
                            setNewPassword(event.target.value)
                          }
                          placeholder="Ingresa tu nueva contraseña"
                        />
                      </Form.Group>
                      <Button variant="outline-tertiary" type="submit">
                        Cambiar contraseña{" "}
                        <i className="bi-solid bi-key-fill"></i>
                      </Button>
                    </Form>
                    <div className="verificar-correo">
                      <p>
                        Para cambiar de contraseña, se te enviará un enlace a tu
                        correo.
                      </p>
                    </div>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="comunidad">
                  <Container className="p-5 perfil-datos-comunidad">
                    <h1>Comunidad</h1>
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 mt-3"
                    >
                      <Tab
                        xs={1}
                        md={1}
                        lg={1}
                        eventKey="publicaciones"
                        title="Publicaciones"
                      >
                        <Col className="mb-3" xs={12}>
                          <PostList posts={posts} />
                        </Col>
                      </Tab>
                      <Tab
                        xs={1}
                        md={1}
                        lg={1}
                        eventKey="favoritos"
                        title="Favoritos"
                      >
                        <Col className="mb-3" xs={12}>
                          <PostList posts={favoritos} />
                        </Col>
                      </Tab>
                      <Tab
                        xs={1}
                        md={1}
                        lg={1}
                        eventKey="comentarios"
                        title="Comentarios"
                      >
                        <Col className="mb-3" xs={12}>
                          <ComentarioList comentarios={comentarios} />
                        </Col>
                      </Tab>
                    </Tabs>
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <FooterComponent />
    </>
  );
};

export default Perfil;

function getCookie(name) {
  const cookies = document.cookie.split(";");
  let userId;
  cookies.forEach((cookie) => {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      userId = cookieValue;
    }
  });
  return userId;
}
