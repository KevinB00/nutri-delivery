import { useState, useEffect } from "react";
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
    postImage: PropTypes.number.isRequired,
    postDate: PropTypes.string.isRequired,
    numFavorites: PropTypes.number.isRequired,
  };
  const [isFavorited, setIsFavorited] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [numFavorites, setNumFavorites] = useState(props.numFavorites);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [postImage, setPostImage] = useState(props.postImage);

  useEffect(() => {
    const fetchIsFavorited = async () => {
      const id_post = props.postId;
      const id_usuario = getCookie("userId");

      const response = await fetch(
        `http://localhost/nutri-delivery/backend/actions/read/checkFavorito.php?id_post=${id_post}&id_usuario=${id_usuario}`
      );

      if (response.ok) {
        const data = await response.json();
        setIsFavorited(data.esFavorito);
      } else {
        console.error("Error al verificar el favorito");
      }
    };
    const fetchImgagePost = async () => {
      const id_post = props.postId;
      const response = await fetch(
        `http://localhost/nutri-delivery/backend/actions/read/getImagePost.php?id_post=${id_post}`
      );
      if (response.ok) {
        const data = await response.json();
        setPostImage(data.ruta_archivo);
      } else {
        console.error("Error al obtener la imagen del post");
      }
    };

    fetchIsFavorited();
    if (props.postImage == 1) {
      fetchImgagePost();
    }
  }, [props.postId, props.postImage]);

  const handleFavoriteClick = async () => {
    setIsFavorited(!isFavorited);

    const id_post = props.postId;
    const id_usuario = getCookie("userId");
    const action = isFavorited ? "quitar" : "agregar";

    const response = await fetch(
      "http://localhost/nutri-delivery/backend/actions/update/updateFavorite.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_post, id_usuario, action }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setNumFavorites(data.numFavorites);
    } else {
      console.error("Error al actualizar el número de favoritos");
    }
  };
  const toggleComments = async () => {
    if (!showComments) {
      try {
        const response = await fetch(
          `http://localhost/nutri-delivery/backend/actions/read/getComentariosByPost.php?id_post=${props.postId}`
        );
        if (response.ok) {
          const data = await response.json();
          setComentarios(data);
        } else {
          console.error("Error al obtener los comentarios");
        }
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    }
    setShowComments(!showComments);
  };

  const handleSubmitComment = async () => {
    const id_publicacion = props.postId;
    const id_usuario = getCookie("userId");
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
        {postImage ? <Card.Img variant="top" src={`http://localhost/nutri-delivery/backend/actions/create/${postImage}`} style={{height: "250px", width: "350px"}} /> : <div></div>}
        <p>Fecha de publicación: {props.postDate}</p>
        <Button variant="tertiary" onClick={handleFavoriteClick}>
          <i className={`bi bi-star${isFavorited ? "-fill" : ""}`}></i>{" "}
          <span>{numFavorites}</span>
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
        {showComments && <ComentarioList comentarios={comentarios} />}
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
