import { Artwork } from 'core/models/artworkModel';
import {
  deleteArtwork,
  getAdminContentArtworks,
} from 'core/services/artwork.service';
import { useEffect, useState } from 'react';
import CollectionCard from 'shared/components/collection-card/collection-card';
import ArtworkJob from '../artwork-job/artwork-job';
import './artwork-jobs.scss';

function ArtworkJobs() {
  const [contentArtworks, setContentArtworks] = useState([{}]);

  useEffect(() => {
    async function getArtworks() {
      try {
        const artworks = await getAdminContentArtworks();
        if (artworks && artworks.length > 0) {
          setContentArtworks(artworks);
        }
      } catch (error) {}
    }
    getArtworks();
  });

  const contentCards = contentArtworks?.map((data: any, id) => {
    if (!data._id) {
      return undefined;
    }
    return (
      <ArtworkJob
        key={id}
        artwork={data}
        onDeleteClick={() => {
          const _id = (data as Artwork)._id;
          if (_id) {
            setContentArtworks(
              contentArtworks.filter((value: any) => {
                return value._id !== _id;
              })
            );
            deleteArtwork(_id);
          }
        }}
      ></ArtworkJob>
    );
  });

  return (
    <div id="artwork-jobs" className="container">
      <div className="collection-cards">{contentCards}</div>
    </div>
  );
}

export default ArtworkJobs;
