import AccountPane from './AccountPane';
import FavoriteMovies from './FavoriteMovies';
import AccountManager from './interfaces/AccountManager';
import './Liked.css';
import TmdbCredits from './TmdbCredits';

export default function Liked(props: { accountMgr: AccountManager }) {
  const { accountMgr } = props;
  return (
    <section className="Liked">
      <div id="content">
        <h1>FilmTime: My Favorite Movies</h1>
        <AccountPane accountMgr={accountMgr} />
        <TmdbCredits />
        <FavoriteMovies accountMgr={accountMgr} />
      </div>
    </section>
  );
}
