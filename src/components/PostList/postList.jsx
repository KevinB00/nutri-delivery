import Post from "../Post/post";
import PropTypes from "prop-types";

const PostList = ({ posts }) => {
  PostList.propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        numFavorites: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        comentarios: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            comentario: PropTypes.string.isRequired,
            nombreUsuario: PropTypes.string.isRequired,
            fechaComentario: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  };
    return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            postTitle={post.title}
            postText={post.body}
            postImage={post.image}
            postDate={post.date}
            numFavorites={post.numFavorites}
            comentarios={post.comentarios}
          />
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
};

export default PostList;
