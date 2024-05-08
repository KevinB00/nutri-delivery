import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./post.sass";

const Post = (props) => {
    Post.propTypes = {
        postTitle: String,
        postText: String,
        postImage: String,
        postDate: String,
        numFavorites: Number
    }
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="mt-3 mb-3 card-post">
      <Card.Body>
        <Card.Title>{props.postTitle}</Card.Title>
        <Card.Text>{props.postText}</Card.Text>
        <img src={props.postImage} alt="Post" />
        <p>Fecha de publicación: {props.postDate}</p>
        <Button variant="cuartet" onClick={handleFavoriteClick}>
          <i className={`bi bi-star${isFavorited ? "-fill" : ""}`}></i> <span>{props.numFavorites}</span>
        </Button>
      </Card.Body>
    </Card>
  );
}
export default Post;
