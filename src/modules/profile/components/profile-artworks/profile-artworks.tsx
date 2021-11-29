// import Swiper core and required modules
import { Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module
import './profile-artworks.scss';
import { deleteArtwork, getArtworksFrom } from 'core/services/artwork.service';
import { useAppSelector } from 'hooks';
import CollectionCard from 'shared/components/collection-card/collection-card';
import { useEffect, useState } from 'react';
import { Artwork, artworkState } from 'core/models/artworkModel';
import { Link } from 'react-router-dom';

function ProfileArtworks() {
  const swiperSlideNames = ['Created', 'Owned', 'On Sale'];
  const account = useAppSelector((state) => state.account);

  const [artworks, setArtworks] = useState([{}]);

  useEffect(() => {
    async function getArtworks() {
      try {
        const artworks = await getArtworksFrom(account.publicAddress);
        if (artworks && artworks.length > 0) {
          setArtworks(artworks);
        }
      } catch (error) {}
    }
    getArtworks();
  }, [account.publicAddress]);

  const creationCards = artworks?.map((data: any, id) => {
    if (
      !data._id ||
      !(
        data.state === artworkState.Content ||
        data.state === artworkState.Created
      )
    ) {
      return undefined;
    }
    return (
      <CollectionCard
        key={id}
        artwork={data}
        onDeleteClick={() => {
          const _id = (data as Artwork)._id;
          if (_id) {
            setArtworks(
              artworks.filter((value: any) => {
                return value._id !== _id;
              })
            );
            deleteArtwork(_id);
          }
        }}
      ></CollectionCard>
    );
  });

  const ownedCards = artworks?.map((data: any, id) => {
    if (!data._id || !(data.state === artworkState.Minted)) {
      return undefined;
    }
    return <CollectionCard key={id} artwork={data}></CollectionCard>;
  });

  return (
    <div className="container">
      <Swiper
        id="profile-artworks"
        // install Swiper modules
        modules={[A11y, Pagination]}
        allowTouchMove={false}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<span class="' +
              className +
              '">' +
              swiperSlideNames[index] +
              '</span>'
            );
          },
        }}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <div className="artwork-slide">
            {!(artworks[0] as Artwork)._id && (
              <h2 className="section-header">
                You will find your <span>created</span> artworks here
              </h2>
            )}
            {(artworks[0] as Artwork)._id && (
              <div className="collection-cards">{creationCards}</div>
            )}
            <Link to="/create">
              <button className="primary-btn">Create More</button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="artwork-slide">
            <h2 className="section-header">
              You will find your <span>minted</span> artworks here
            </h2>
            <div className="collection-cards">{ownedCards}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="artwork-slide">
            <h2 className="section-header">
              You will find your artworks <span>on sale</span> here
            </h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ProfileArtworks;
