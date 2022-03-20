import './Home.css';
import PopularMovies from './PopularMovies';
import AccountPane from './AccountPane';
import AccountManager from './interfaces/AccountManager';
import TmdbCredits from './TmdbCredits';

export default function Home(props: { accountMgr: AccountManager }) {
  const { accountMgr } = props;
  return (
    <section className="Home">
      <div id="content">
        <h1>FilmTime: Popular Movies</h1>
        <AccountPane accountMgr={accountMgr} />
        <TmdbCredits />
        <PopularMovies accountMgr={accountMgr} />
      </div>
    </section>
  );
}
