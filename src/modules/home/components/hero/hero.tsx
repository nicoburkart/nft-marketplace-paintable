import './hero.scss';

import heroImg from 'assets/images/hero-img.png';
import { Link } from 'react-router-dom';

function HomeHero() {
  return (
    <div id="hero">
      <div className="container">
        <div className="section-left">
          <h1 className="header">
            Turn Your Photo <br /> Into A NFT Artwork
          </h1>
          <h2 className="sub-section-header">
            Upload a picture and create an artwork with our ai. <br /> Sell the
            artwork as a NFT.
          </h2>
          <Link to="/create">
            <button className="primary-btn">Create</button>
          </Link>
        </div>
        <div className="section-right">
          <img
            className="hero-img"
            src={heroImg}
            alt="example of an ai artwork"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
