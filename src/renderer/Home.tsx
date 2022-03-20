import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <section className="Home">
      <div id="content">
        <h1>Home</h1>
        <Link to="/liked">Liked</Link>
        <div style={{ height: '2000px' }}>Long Content</div>
      </div>
    </section>
  );
}
