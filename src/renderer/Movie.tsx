import { MovieResult } from 'moviedb-promise/dist/request-types';
import { Card, Col, Row } from 'react-bootstrap';
import './Movie.css';

export default function Movie(props: { movie: MovieResult }) {
  const { movie } = props;
  return (
    <Card className="Movie">
      <Card.Img
        variant="top"
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
      />
      <Card.Title>
        <Row>
          <Col xs="1">
            <span className="like">🤍</span>
          </Col>
          <Col xs="11">
            <span className="title">{movie.title}</span>
          </Col>
        </Row>
      </Card.Title>
    </Card>
  );
}
