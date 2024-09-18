import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AdminCommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://nutri-delivery.vercel.app/backend/actions/read/getAllComments.php')
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (commentId) => {
    axios.delete('http://nutri-delivery.vercel.app/backend/actions/delete/deleteComment.php', { data: { id: commentId } })
      .then(() => setComments(comments.filter(comment => comment.id !== commentId)))
      .catch(error => console.error(error));
  };

  return (
    <Table striped bordered hover className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Comentario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {comments.map(comment => (
          <tr key={comment.id_comentario}>
            <td>{comment.id_comentario}</td>
            <td>{comment.comentario}</td>
            <td>
              <Button variant="primary" onClick={() => handleDelete(comment.id_comentario)}>
                Borrar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminCommentList;
