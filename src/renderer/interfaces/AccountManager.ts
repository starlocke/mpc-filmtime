import { MovieDb } from 'moviedb-promise';
import { AccountInfoResponse } from 'moviedb-promise/dist/request-types';
import { Dispatch, SetStateAction } from 'react';

export default class AccountManager {
  session?: string;

  setSession: Dispatch<SetStateAction<string | undefined>>;

  account?: AccountInfoResponse;

  setAccount: Dispatch<SetStateAction<AccountInfoResponse | undefined>>;

  moviedb: MovieDb;

  constructor(
    moviedb: MovieDb,
    session: string | undefined,
    setSession: Dispatch<SetStateAction<string | undefined>>,
    account: AccountInfoResponse | undefined,
    setAccount: Dispatch<SetStateAction<AccountInfoResponse | undefined>>
  ) {
    this.moviedb = moviedb;
    this.session = session;
    this.setSession = setSession;
    this.account = account;
    this.setAccount = setAccount;
  }
}
