import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ComentarioList from "../ComentarioList/comentarioList";
import PropTypes from "prop-types";

import "./post.sass";

const Post = (props) => {
  Post.propTypes = {
    postId: PropTypes.number.isRequired,
    postTitle: PropTypes.string.isRequired,
    postText: PropTypes.string.isRequired,
    postImage: PropTypes.string.isRequired,
    postDate: PropTypes.string.isRequired,
    numFavorites: PropTypes.number.isRequired,
    comentarios: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        comentario: PropTypes.string.isRequired,
        nombreUsuario: PropTypes.string.isRequired,
        fechaComentario: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  const [isFavorited, setIsFavorited] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = async () => {
    const id_publicacion = props.postId;
    const id_usuario = getCookie("id_usuario"); // Implementa getCookie para obtener el ID del usuario desde las cookies
    const comentario = comment;

    const response = await fetch(
      "http://localhost/nutri-delivery/backend/actions/create/addComentario.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_publicacion, id_usuario, comentario }),
      }
    );

    if (response.ok) {
      // Recargar comentarios o manejar el éxito de alguna otra manera
      setShowModal(false);
      setComment("");
    } else {
      console.error("Error al enviar el comentario");
    }
  };

  return (
    <Card className="mt-3 mb-3 card-post">
      <Card.Body>
        <Card.Title>{props.postTitle}</Card.Title>
        <Card.Text>{props.postText}</Card.Text>
        <img src={props.postImage} alt="Post" />
        <p>Fecha de publicación: {props.postDate}</p>
        <Button variant="tertiary" onClick={handleFavoriteClick}>
          <i className={`bi bi-star${isFavorited ? "-fill" : ""}`}></i>{" "}
          <span>{props.numFavorites}</span>
        </Button>
        <Button
          variant="outline-secondary"
          className="comentario"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-pencil"></i> Comentar
        </Button>
        <Button
          variant="secondary"
          className="ver-comentarios"
          onClick={toggleComments}
        >
          <i className="bi bi-chat-square-text-fill"></i> Ver comentarios
        </Button>
        {showComments && <ComentarioList comentarios={props.comentarios} />}
      </Card.Body>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="commentTextarea">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmitComment}>
            Enviar Comentario
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Post;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}