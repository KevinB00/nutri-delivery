import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderComponent from "../../components/Header/header";
import FooterComponent from "../../components/Footer/footer";
import PostList from "../../components/PostList/postList";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./communityPage.sass";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [filterOptionsVisible, setFilterOptionsVisible] = useState(false);
  const setFilter = (filter) => {
    filter === "favoritos"
  }

  const applyFilter = () => {
    setFilterOptionsVisible(false);
  }

  //Listar posts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost/nutri-delivery/backend/actions/read/getAllPosts.php");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  


  return (
    <>
      <HeaderComponent />
      <Container>
        <Row className="mb-3 mt-3">
          <Col className="text-start">
            <Button variant="secondary" onClick={() => window.location.href = "/createPost"}>
              Crear post
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" onClick={() => setFilterOptionsVisible(true)}>Filtros</Button>
            <Modal show={filterOptionsVisible} onHide={() => setFilterOptionsVisible(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Filtros</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div className="mb-3">
                    <label htmlFor="filterFav" className="form-label">Favoritos</label>
                    <select className="form-select" id="filterFav" onChange={(e) => setFilter({ favoritos: e.target.value })}>
                      <option value=""> Todos</option>
                      <option value="1">Sí</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="filterDate" className="form-label">Fecha</label>
                    <select className="form-select" id="filterDate" onChange={(e) => setFilter({ fecha: e.target.value })}>
                      <option value=""> Todos</option>
                      <option value="asc">Ascendente</option>
                      <option value="desc">Descendente</option>
                    </select>
                  </div>
                  <button type="button" className="btn btn-secondary" onClick={() => {
                    setFilterOptionsVisible(false);
                    applyFilter();
                  }}>
                    Aceptar
                  </button>
                </form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <PostList posts={posts} />
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
};

export default CommunityPage;
