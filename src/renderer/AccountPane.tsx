import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { AccountInfoResponse } from 'moviedb-promise/dist/request-types';
import { useCallback, useState } from 'react';
import { AuthenticationToken } from 'moviedb-promise/dist/types';
import AccountManager from './interfaces/AccountManager';

import './AccountPane.css';

export default function AccountPane(props: { accountMgr: AccountManager }) {
  const { accountMgr } = props;
  const { moviedb, setSession, account, setAccount } = accountMgr;
  const [showModal, setShowModal] = useState(false);
  const [tokenUrl, setTokenUrl] = useState<string | undefined>(undefined);

  const initToken = useCallback(() => {
    moviedb
      .requestToken()
      .then((res: AuthenticationToken) => {
        console.log('requestToken result');
        console.log(res);
        const url = `https://www.themoviedb.org/authenticate/${res.request_token}`;
        window.open(url, '_blank');
        setTokenUrl(url);
        setShowModal(true);
        return url;
      })
      .catch(console.error);
  }, [moviedb]);

  const initSession = useCallback(async () => {
    await moviedb
      .retrieveSession()
      .then((sessionId: string) => {
        setSession(sessionId);
        console.log(`sessionId: ${sessionId}`);
        window.localStorage.setItem('sessionId', sessionId);
        return sessionId;
      })
      .catch(console.error);
    moviedb
      .accountInfo()
      .then((res: AccountInfoResponse) => {
        setAccount(res);
        return res;
      })
      .catch(console.error);
  }, [moviedb, setAccount, setSession]);

  if (!account) {
    return (
      <section className="AccountPane">
        <Button onClick={initToken}>Login with TMDB</Button>
        <Modal show={showModal}>
          <ModalDialog>
            <ModalHeader>
              <ModalTitle>Auth</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <ol>
                <li>
                  Please
                  <a href={tokenUrl} target="_blank" rel="noreferrer">
                    authenticate
                  </a>
                  this app at TMDB with your web browser.
                </li>
                <li>
                  Then, click <em>Continue</em>, below.
                </li>
              </ol>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => initSession()}>Continue</Button>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
            </ModalFooter>
          </ModalDialog>
        </Modal>
      </section>
    );
  }

  return (
    <section className="AccountPane">
      <Link to="/">
        <Button>Popular Movies</Button>
      </Link>
      <Link to="/liked">
        <Button>Favourite Movies</Button>
      </Link>
      <Button className="bg-warning border-warning text-secondary">
        Logout
      </Button>
      {account.avatar?.gravatar?.hash && (
        <Image
          src={`https://www.gravatar.com/avatar/${account.avatar?.gravatar?.hash}?s=42`}
          className="rounded float-left"
          alt="Avatar"
        />
      )}
      <Badge bg="secondary">{account.username}</Badge>
    </section>
  );
}
