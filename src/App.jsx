import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
