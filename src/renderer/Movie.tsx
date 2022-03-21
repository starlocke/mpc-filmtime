import {
  MovieAccountStateResponse,
  MovieResult,
} from 'moviedb-promise/dist/request-types';
import { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import AccountManager from './interfaces/AccountManager';
import './Movie.css';

export default function Movie(props: {
  movie: MovieResult;
  accountMgr: AccountManager;
  isFavorite?: boolean;
}) {
  const { movie, accountMgr, isFavorite } = props;
  const { moviedb } = accountMgr;
  const heartRed = '❤'; // red-filled-heart
  const heartWhite = '🤍'; // white-outline-heart
  const [liked, setLiked] = useState(isFavorite);
  const [heart, setHeart] = useState(heartWhite);
  const handleHeartClick = useCallback(() => {
    if (!accountMgr.session) {
      // trigger sign-in
      window.onSessionFavMovieId = movie.id;
      window.initToken();
      return;
    }
    if (accountMgr.account && accountMgr.account.id && movie.id) {
      window.onSessionFavMovieId = null;
      const desiredFavoriteState = !liked;
      // MEMO: I could not make use of "moviedb-promise" here.
      //       There were errors in how it crafted the URL and payload.
      //       It became necessary manually implement the API call.
      const apiKey = Buffer.from('ZDBmNWYyZTEzNTMzNjIwMDM2MmFmOGExYTczYWNiMTc=', 'base64').toString();
      const favUrl = `https://api.themoviedb.org/3/account/${accountMgr.account.id}/favorite?api_key=${apiKey}&session_id=${moviedb.sessionId}`;
      const body = JSON.stringify({
        media_type: 'movie',
        media_id: movie.id,
        favorite: desiredFavoriteState,
      });
      const opts = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      };
      fetch(favUrl, opts)
        .then((res) => {
          setHeart(desiredFavoriteState ? heartRed : heartWhite);
          setLiked(desiredFavoriteState);
          return res;
        })
        .catch(console.error);
    }
  }, [accountMgr.session, accountMgr.account, movie.id, moviedb, liked]);
  useEffect(() => {
    if (isFavorite) {
      setLiked(true);
      setHeart(heartRed);
    } else if (accountMgr.session) {
      moviedb
        .movieAccountStates({ id: `${movie.id}` })
        .then((res: MovieAccountStateResponse) => {
          if (res.favorite) {
            setLiked(res.favorite);
            setHeart(heartRed);
          }
          return res;
        })
        .catch(console.error);
    }
    const { onSessionFavMovieId } = window;
    if (onSessionFavMovieId && movie.id === onSessionFavMovieId) {
      if (!liked) {
        handleHeartClick();
      }
    }
  }, [
    movie,
    moviedb,
    accountMgr,
    setLiked,
    setHeart,
    isFavorite,
    liked,
    handleHeartClick,
  ]);

  return (
    <Card className="Movie">
      <Card.Img
        variant="top"
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
      />
      <Card.Title>
        <Row>
          <Col xs="2">
            <Button className="like" onClick={handleHeartClick}>
              {heart}
            </Button>
          </Col>
          <Col xs="10">
            <span className="title">{movie.title}</span>
          </Col>
        </Row>
      </Card.Title>
    </Card>
  );
}

Movie.defaultProps = {
  isFavorite: false,
};
