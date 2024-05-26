import Post from "../Post/post";
import PropTypes from "prop-types";

const PostList = ({ posts }) => {
  PostList.propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id_publicacion: PropTypes.number.isRequired,
        titulo: PropTypes.string.isRequired,
        contenido: PropTypes.string.isRequired,
        tiene_imagen: PropTypes.number.isRequired,
        numero_favoritos: PropTypes.number.isRequired,
        fecha_publicacion: PropTypes.string.isRequired
      })
    ).isRequired,
  };
    return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id_publicacion}
            postId={post.id_publicacion}
            postTitle={post.titulo}
            postText={post.contenido}
            postImage={post.tiene_imagen}
            postDate={post.fecha_publicacion}
            numFavorites={post.numero_favoritos}
          />
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
};

export default PostList;
