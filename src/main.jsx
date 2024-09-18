import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './sass/index.sass'

const urlLogged = "https://nutri-delivery.vercel.app/backend/auth/isLogged.php";
const cookies = document.cookie.split(";");
const checkSession = () => {
  let userId;

  // Buscar el ID de usuario en las cookies
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    if (name === "userId") {
      userId = value;
    }
  });

  // Si se encontró el ID de usuario en las cookies, realizar una solicitud para verificar si está autenticado
  if (userId) {
    fetch(`${urlLogged}?userId=${userId}`)
    .then((response) => {
      // Verificar si la respuesta del servidor es correcta
      if (response.ok) {
        // Devolver la respuesta sin procesar para su inspección
        return response.text();
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .then((data) => {
      // Convertir la respuesta a JSON si es posible
      try {
        const jsonData = JSON.parse(data);
        // Renderizar la aplicación con el estado de autenticación
        renderApp(jsonData);
      } catch (error) {
        console.error('Error al parsear la respuesta del servidor:', error);
        // En caso de error al parsear la respuesta, renderizar la aplicación con isLogged=false
        renderApp(false);
      }
    })
    .catch((error) => {
      console.error('Error al verificar la sesión:', error);
      // En caso de error, renderizar la aplicación con isLogged=false
      renderApp(false);
    });
  }

  // Si no se encontró el ID de usuario en las cookies, renderizar la aplicación con isLogged=false
  else {
    renderApp(false);
  }
}

  const renderApp = (isLogged) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App isLogged={isLogged} />
      </React.StrictMode>,
    );
  }

  checkSession()