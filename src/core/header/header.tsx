import './header.scss';

import {
  resetAccount,
  setAccountName,
  setAccountPublicAddress,
} from '../redux/accountSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Web3Service } from 'core/services/web3.service';
import { AuthService } from 'core/services/auth.service';
import { Link } from 'react-router-dom';

function Header() {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  async function connectWallet() {
    try {
      const user = await new Web3Service().loginWithMetamaks();
      if (user) {
        dispatch(setAccountPublicAddress(user.publicAddress));
        dispatch(setAccountName(user.name));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    new AuthService().logout();
    dispatch(resetAccount());
    console.log(account);
  }

  return (
    <nav id="nav" className="container">
      <Link to="/">
        <h1 className="logo header">Paintable</h1>
      </Link>
      <div className="right-align">
        {account.publicAddress === '' && (
          <button className="secondary-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        {account.publicAddress !== '' && (
          <Link to="/profile">
            <div className="avatar">
              <img
                src={
                  'http://localhost:8080/avatars/' +
                  account.publicAddress +
                  '.png'
                }
                alt="avatar"
              />
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
