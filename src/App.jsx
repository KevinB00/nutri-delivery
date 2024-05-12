import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/homePage";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import ErrorPage from "./pages/Error/error";
import ListaPlatos from "./pages/ListaPlatos/listaPlatos";
import ListaRestaurantes from "./pages/ListaRestaurante/listaRestaurantes";
import InfoPlato from "./pages/InfoPlato/infoPlato";
import Perfil from "./pages/Perfil/perfil";
import CommunityPage from "./pages/Community/communityPage";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
