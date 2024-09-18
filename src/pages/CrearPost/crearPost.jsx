import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import './crearPost.sass';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });

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
      const response = await fetch("http://nutri-delivery.vercel.app/backend/actions/create/createPost.php", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setAlert({ message: "Post creado exitosamente", type: "tertiary" });
      } else {
        throw new Error(result.error || "Error al crear el post");
      }
    } catch (error) {
      setAlert({ message: error.message, type: "primary" });
    }
  };

  return (
    <Container className="mt-5 create-post-container">
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
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
