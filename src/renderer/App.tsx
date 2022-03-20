import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Liked from './Liked';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </Router>
  );
}
