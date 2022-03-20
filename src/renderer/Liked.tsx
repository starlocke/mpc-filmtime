import { Link } from 'react-router-dom';
import './Liked.css';

export default function Liked(props: { accountMgr: AccountManager }) {
  const { accountMgr } = props;
  return (
    <section className="Liked">
      <div id="content">
        <h1>Liked</h1>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}
