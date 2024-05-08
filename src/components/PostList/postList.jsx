import Post from "../Post/post";

const PostList = ({ posts }) => {
    PostList.propTypes = {
        posts: Array
    }
    return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            postTitle={post.title}
            postText={post.body}
            postDate={post.date}
            numFavorites={post.numFavorites}
          />
        ))
      ) : (
        <p>No hay publicaciones disponibles.</p>
      )}
    </div>
  );
};

export default PostList;
