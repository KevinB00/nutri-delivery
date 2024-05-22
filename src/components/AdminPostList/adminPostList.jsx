import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AdminPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/nutri-delivery/backend/actions/read/getAllPosts.php')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (postId) => {
    axios.delete('http://localhost/nutri-delivery/backend/actions/delete/deletePost.php', { data: { id: postId } })
      .then(() => setPosts(posts.filter(post => post.id !== postId)))
      .catch(error => console.error(error));
  };

  return (
    <Table striped bordered hover className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id_publicacion}>
            <td>{post.id_publicacion}</td>
            <td>{post.titulo}</td>
            <td>
              <Button variant="primary" onClick={() => handleDelete(post.id_publicacion)}>
                Borrar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminPostList;
