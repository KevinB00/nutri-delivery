import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/homePage';
import CommunityPage from './pages/CommunityPage';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import ErrorPage from './pages/Error/error';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
