import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/homePage';
import CommunityPage from './pages/CommunityPage';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import ListaPlatos from './pages/ListaPlatos/listaPlatos';
import ListaRestaurantes from './pages/ListaRestaurante/listaRestaurantes';
import InfoPlato from './pages/InfoPlato/infoPlato';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="platos" element={<ListaPlatos />}></Route>
          <Route path='plato/:platoId' element={<InfoPlato />}/>
          <Route path="restaurantes" element={<ListaRestaurantes />}></Route>
          <Route path='restaurante/:restauranteId/platos' element={<ListaPlatos />}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}


export default App;
