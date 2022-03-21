import {
  PopularMoviesRequest,
  MovieResult,
  PopularMoviesResponse,
} from 'moviedb-promise/dist/request-types';
import { useCallback, useEffect, useState } from 'react';
import AccountManager from './interfaces/AccountManager';
import Movie from './Movie';

export default function PopularMovies(props: { accountMgr: AccountManager }) {
  const { accountMgr } = props;
  const { moviedb } = accountMgr;
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState<MovieResult[] | undefined>(undefined);

  const load = useCallback(() => {
    setLoading(true);
    const req: PopularMoviesRequest = { page };
    moviedb
      .moviePopular(req)
      .then((res: PopularMoviesResponse) => {
        setMovies(res.results);
        const total = parseInt(`${res.total_pages}`, 10);
        setTotalPages(Math.max(0, Math.min(total, 500)));
        setLoading(false);
        return res;
      })
      .catch(console.error);
  }, [page, setMovies, setTotalPages, setLoading, moviedb]);
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
            setPage(Math.max(1, Math.min(p, 500, totalPages)));
          }}
        />
        <input type="button" value="Load" onClick={load} />
        Total pages: {totalPages}
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
      {movies &&
        movies.map((m: MovieResult) => (
          <Movie key={m.id} movie={m} accountMgr={accountMgr} />
        ))}
    </div>
  );
}
