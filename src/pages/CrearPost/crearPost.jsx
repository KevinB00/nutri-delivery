import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './crearPost.sass';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const cookies = document.cookie.split(";");
  let userId;

  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name === "userId") {
      userId = value;
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('titulo', title);
    formData.append('contenido', content);
    formData.append('id_usuario', userId);
    if (image) {
      formData.append('imagen', image);
    }

    try {
      const response = await axios.post('http://localhost/nutri-delivery/backend/actions/create/createPost.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container className="mt-5 create-post-container">
      <h1 className="create-post-header">Crear Nuevo Post</h1>
      <Form className="create-post-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Título del post" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formContent" className="mt-3">
          <Form.Label>Contenido</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            placeholder="Contenido del post" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formImage" className="mt-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="tertiary" type="submit" className="submit-btn">
          Crear Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePost;
