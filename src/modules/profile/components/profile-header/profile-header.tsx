import { useAppDispatch, useAppSelector } from 'hooks';
import './profile-header.scss';
import { ChangeEvent, useState } from 'react';

import penIcon from 'assets/icons/pen.svg';
import doneIcon from 'assets/icons/done.svg';
import { setAccountName } from 'core/redux/accountSlice';
import { updateAccountName } from 'core/services/account.service';

function ProfileHeader() {
  const account = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const [isEditingName, setIsEditingName] = useState(false);

  function toggleEditingName() {
    if (isEditingName) {
      updateAccountName(account.name);
    }
    setIsEditingName(!isEditingName);
  }

  function updateName(event: ChangeEvent) {
    const name = (event.target as HTMLInputElement).value;
    if (name.length > 0) {
      dispatch(setAccountName(name));
    }
  }

  return (
    <div id="profile-header" className="container">
      <div className="profile-banner">
        <div className="avatar">
          <img
            src={
              'http://localhost:8080/avatars/' + account.publicAddress + '.png'
            }
            alt=""
          />
        </div>
      </div>
      <p>public address</p>
      <h2 className="section-header public-address">{account.publicAddress}</h2>
      <p>profile name</p>
      <div className="profile-name">
        {!isEditingName && <h2 className="section-header">{account.name}</h2>}
        {isEditingName && (
          <input
            className="form-control"
            type="text"
            defaultValue={account.name}
            onChange={updateName}
          />
        )}
        <button onClick={toggleEditingName}>
          {!isEditingName && <img src={penIcon} alt="" />}
          {isEditingName && <img src={doneIcon} alt="" />}
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
