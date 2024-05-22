import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ComentarioList from "../ComentarioList/comentarioList";
import PropTypes from 'prop-types';

import "./post.sass";

const Post = (props) => {
  Post.propTypes = {
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

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
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
        <Button variant="outline-secondary" className="comentario">
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
    </Card>
  );
};

export default Post;
