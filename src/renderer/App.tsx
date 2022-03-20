import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Home.css';
import './Liked.css';
import Home from './Home';
import Liked from './Liked';

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
