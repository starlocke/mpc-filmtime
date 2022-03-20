import { MovieDb } from 'moviedb-promise';
import {
  PopularMoviesRequest,
  MovieResult,
  PopularMoviesResponse,
} from 'moviedb-promise/dist/request-types';
import { useCallback, useEffect, useState } from 'react';
import Movie from './Movie';

export default function PopularMovies() {
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState();

  const load = useCallback(() => {
    setLoading(true);
    const moviedb = new MovieDb(Buffer.from('ZDBmNWYyZTEzNTMzNjIwMDM2MmFmOGExYTczYWNiMTc=', 'base64').toString());
    const req: PopularMoviesRequest = { page };
    moviedb
      .moviePopular(req)
      .then((res: PopularMoviesResponse) => {
        setMovies(res.results);
        const total = parseInt(res.total_pages, 10);
        setTotalPages(Math.max(1, Math.min(total, 500)));
        setLoading(false);
        console.log(res);
        return res;
      })
      .catch(console.error);
  }, [page, setMovies, setTotalPages, setLoading]);
  useEffect(() => {
    load();
  }, [load]);

  const form = (
    <div>
      <form onSubmit={load}>
        <input
          type="number"
          value={page}
          max={totalPages}
          onChange={(event) => {
            const p = parseInt(event.target.value, 10);
            setPage(Math.max(1, Math.min(p, 500)));
          }}
        />
        <input type="button" value="Load" onClick={load} />
      </form>
    </div>
  );

  if (isLoading) {
    return (
      <div className="PopularMovies">
        {form}
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="PopularMovies">
      {form}
      {movies.map((m: MovieResult) => (
        <Movie key={m.id} movie={m} />
      ))}
    </div>
  );
}
