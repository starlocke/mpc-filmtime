import { Image } from 'react-bootstrap';
import tmdb from '../../assets/tmdb-logo.svg';

export default function TmdbCredits() {
  return (
    <div className="TmdbCredits">
      <p>
        Datasets and images provided by:
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          className="tmdb-link"
          rel="noreferrer"
        >
          <Image className="tmdb-logo" src={tmdb} alt="TMDB Logo" />
        </a>
      </p>
    </div>
  );
}
