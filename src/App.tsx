import { Web3Service } from 'core/services/web3.service';
import { useAppDispatch } from 'hooks';
import {
  setAccountName,
  setAccountPublicAddress,
} from './core/redux/accountSlice';

import CoreHeader from './core/header/header';
import AppHome from './modules/home/home';
import './styles/main.scss';
import AppProfile from 'modules/profile/profile';
import Create from 'modules/create/create';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppAdmin from 'modules/admin/admin';

function App() {
  const dispatch = useAppDispatch();

  async function loginWithJWT() {
    const user = await new Web3Service().loginWithMetamaks(true);
    if (user) {
      dispatch(setAccountPublicAddress(user.publicAddress));
      dispatch(setAccountName(user.name));
    } else {
      console.log('could not login automatically');
    }
  }

  loginWithJWT();

  return (
    <Router>
      <div className="App">
        <CoreHeader></CoreHeader>
        <Switch>
          <Route exact path="/" component={AppHome}></Route>
          <Route exact path="/profile">
            {AppProfile}
          </Route>
          <Route exact path="/create">
            {Create}
          </Route>
          <Route exact path="/admin">
            {AppAdmin}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
