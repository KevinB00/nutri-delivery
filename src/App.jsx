import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage/homePage";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import ErrorPage from "./pages/Error/error";
import ListaPlatos from "./pages/ListaPlatos/listaPlatos";
import ListaRestaurantes from "./pages/ListaRestaurante/listaRestaurantes";
import InfoPlato from "./pages/InfoPlato/infoPlato";
import Perfil from "./pages/Perfil/perfil";
import CommunityPage from "./pages/Community/communityPage";
import AdminPage from "./pages/Admin/adminPage";
import CreatePost from "./pages/CrearPost/crearPost";
import PropTypes from "prop-types";

function App(props) {
  App.propTypes = {
    isLogged: PropTypes.bool.isRequired
  };
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userId = getCookie();
    if (userId) {
      checkIfAdmin(userId);
    }
  }, []);

  const checkIfAdmin = async (userId) => {
    try {
      const response = await fetch(`http://localhost/nutri-delivery/backend/auth/isAdmin.php?id_usuario=${userId}`);
      const data = await response.json();
      setIsAdmin(data.es_administrador);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const getCookie = () => {
    let userId;
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name === "userId") {
        userId = value;
      }
    });
    return userId;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="community" element={<CommunityPage />} />
        
        {!props.isLogged && (
          <>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </>
        )}
        {props.isLogged && (
          <>
            <Route path="createPost" element={<CreatePost />}></Route>
          </>
        )}
        <Route path="perfil" element={<Perfil />}></Route>

        <Route path="*" element={<ErrorPage />} />
        <Route path="platos" element={<ListaPlatos />}></Route>
        <Route path="plato/:platoId" element={<InfoPlato />} />
        <Route path="restaurantes" element={<ListaRestaurantes />}></Route>
        <Route
          path="restaurante/:restauranteId/platos"
          element={<ListaPlatos />}
        />
        <Route path="perfil" element={<Perfil />}></Route>
        {isAdmin && <Route path="admin" element={<AdminPage />}></Route>}
      </Routes>
    </BrowserRouter>
  );
}


export default App;
