import './collection-card.scss';
import dotMenu from 'assets/icons/dot-menu.svg';
import { useState } from 'react';

function CollectionCard(props: any) {
  let publicAddress = '';
  let accountName = '';
  let imageSource = '';

  const [interactionMenuIsOpen, setInteractionMenuIsOpen] = useState(false);

  if (props.account) {
    publicAddress = props.account.publicAddress;
    accountName = props.account.name;
    if (props.artwork.contentImage) {
      imageSource = props.artwork.contentImage;
    }
  } else {
    publicAddress = props.artwork.creator;
    accountName = props.artwork.userName;
    if (props.artwork.contentImage) {
      imageSource = `http://localhost:8080/content-images/${props.artwork.contentImage}`;
    }
  }

  return (
    <div className="collection-card">
      <div className="collection-card-header">
        <div className="creator">
          <div className="avatar">
            {publicAddress && publicAddress.length > 0 && (
              <img
                src={'http://localhost:8080/avatars/' + publicAddress + '.png'}
                alt=""
              />
            )}
          </div>
          <p>{accountName}</p>
        </div>
        {props.onDeleteClick && (
          <div className="interaction">
            <img
              className="dot-menu"
              src={dotMenu}
              alt=""
              onClick={() => setInteractionMenuIsOpen(!interactionMenuIsOpen)}
            />
            {interactionMenuIsOpen && (
              <div className="interaction-menu">
                <ul>
                  <li>Edit</li>
                  <li
                    onClick={() => {
                      setInteractionMenuIsOpen(false);
                      props.onDeleteClick();
                    }}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="collection-card-body">
        {imageSource.length > 0 && (
          <div className="artwork-wrapper overlay">
            <img src={imageSource} alt="" />
          </div>
        )}
      </div>
      <div className="collection-card-footer">
        <h3>{props.artwork.title}</h3>
        <div className="nft-infos">
          <div className="info-left">
            <p className="info-label">Available</p>
            <p>
              {props.artwork.tokenAmount}/{props.artwork.tokenAmount}
            </p>
          </div>
          <div className="info-right">
            <p className="info-label">Sale Price</p>
            <p>{props.artwork.initialTokenPrice} ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
