import { Link } from 'react-router-dom';
import { MovieDb } from 'moviedb-promise';
import { PopularMoviesResponse } from 'moviedb-promise/dist/request-types';
import './Home.css';
import PopularMovies from './PopularMovies';
import AccountPane from './AccountPane';

const moviedb = new MovieDb(Buffer.from('ZDBmNWYyZTEzNTMzNjIwMDM2MmFmOGExYTczYWNiMTc=', 'base64').toString());

moviedb
  .moviePopular()
  .then((value: PopularMoviesResponse) => {
    console.log(value);
    return value;
  })
  .catch(console.error);

export default function Home() {
  return (
    <section className="Home">
      <div id="content">
        <h1>Home</h1>
        <AccountPane />
        <Link to="/liked">Liked</Link>
        <PopularMovies />
      </div>
    </section>
  );
}
