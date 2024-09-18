import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://nutri-delivery.vercel.app/backend/actions/read/getAllUsers.php')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (userId) => {
    axios.delete('http://nutri-delivery.vercel.app/backend/actions/delete/deleteUser.php', { data: { id: userId } })
      .then(() => setUsers(users.filter(user => user.id !== userId)))
      .catch(error => console.error(error));
  };

  return (
    <Table striped bordered hover className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id_usuario}>
            <td>{user.id_usuario}</td>
            <td>{user.nombre}</td>
            <td>{user.email}</td>
            <td>
              <Button variant="primary" onClick={() => handleDelete(user.id_usuario)}>
                Borrar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminUserList;
