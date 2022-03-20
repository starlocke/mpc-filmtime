import { Link } from 'react-router-dom';
import './Home.css';
import PopularMovies from './PopularMovies';
import AccountPane from './AccountPane';
import AccountManager from './interfaces/AccountManager';

export default function Home(props: { accountMgr: AccountManager }) {
  const { accountMgr } = props;
  return (
    <section className="Home">
      <div id="content">
        <h1>Home</h1>
        <AccountPane accountMgr={accountMgr} />
        <Link to="/liked">Liked</Link>
        <PopularMovies accountMgr={accountMgr} />
      </div>
    </section>
  );
}
