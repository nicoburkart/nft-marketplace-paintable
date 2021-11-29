import { Artwork } from 'core/models/artworkModel';
import { useState } from 'react';
import dotMenu from 'assets/icons/dot-menu.svg';
import './artwork-job.scss';

function ArtworkJob(props: any) {
  const artwork: Artwork = props.artwork;
  const [interactionMenuIsOpen, setInteractionMenuIsOpen] = useState(false);

  return (
    <div className="artwork-job collection-card">
      <div className="collection-card-header artwork-job-header">
        <div className="creator">
          <div className="avatar">
            {artwork.creator && artwork.creator.length > 0 && (
              <img
                src={
                  'http://localhost:8080/avatars/' + artwork.creator + '.png'
                }
                alt=""
              />
            )}
          </div>
          <p>
            {artwork.creator.substr(0, 10)}...
            {artwork.creator.substr(artwork.creator.length - 8)}
          </p>
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
      <div className="collection-card-body artwork-job-body">
        <div className="artwork-wrapper">
          <img
            src={`http://localhost:8080/content-images/${artwork.contentImage}`}
            alt=""
          />
        </div>
      </div>
      <div className="collection-card-footer artwork-job-footer">
        <h3>{artwork.title}</h3>
        <div className="nft-infos">
          <div className="info-left">
            <p className="info-label">Artstyle</p>
            <p>{artwork.artStyle.toUpperCase()}</p>
          </div>
          <div className="info-right">
            <p className="info-label">Sale Price</p>
            <p>{artwork.initialTokenPrice} ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtworkJob;
