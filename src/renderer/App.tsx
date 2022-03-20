import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieDb } from 'moviedb-promise';
import { AccountInfoResponse } from 'moviedb-promise/dist/request-types';
import { useMemo, useState } from 'react';
import Home from './Home';
import Liked from './Liked';
import AccountManager from './interfaces/AccountManager';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const storedSessionId = window.localStorage.getItem('sessionId');
  const [session, setSession] = useState<string | null>(storedSessionId);
  const [account, setAccount] = useState<AccountInfoResponse | undefined>(
    undefined
  );
  const moviedb = useMemo(() => {
    const mdb = new MovieDb(Buffer.from('ZDBmNWYyZTEzNTMzNjIwMDM2MmFmOGExYTczYWNiMTc=', 'base64').toString());
    if (storedSessionId) {
      mdb.sessionId = storedSessionId;
      mdb
        .accountInfo()
        .then((res: AccountInfoResponse) => {
          setAccount(res);
          return res;
        })
        .catch(console.error);
    }
    return mdb;
  }, [storedSessionId]);

  const accountMgr = useMemo(() => {
    return new AccountManager(
      moviedb,
      session,
      setSession,
      account,
      setAccount
    );
  }, [moviedb, session, setSession, account, setAccount]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home accountMgr={accountMgr} />} />
        <Route path="/liked" element={<Liked accountMgr={accountMgr} />} />
      </Routes>
    </Router>
  );
}
