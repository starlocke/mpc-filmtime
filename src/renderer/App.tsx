import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieDb } from 'moviedb-promise';
import { AccountInfoResponse } from 'moviedb-promise/dist/request-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthenticationToken } from 'moviedb-promise/dist/types';
import Home from './Home';
import Liked from './Liked';
import AccountManager from './interfaces/AccountManager';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [session, setSession] = useState<string | undefined>(undefined);
  const [account, setAccount] = useState<AccountInfoResponse | undefined>(
    undefined
  );
  const [tokenUrl, setTokenUrl] = useState<string | undefined>(undefined);
  const moviedb = useMemo(() => {
    return new MovieDb(Buffer.from('ZDBmNWYyZTEzNTMzNjIwMDM2MmFmOGExYTczYWNiMTc=', 'base64').toString());
  }, []);

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
