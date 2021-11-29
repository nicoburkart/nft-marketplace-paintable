import ProfileArtworks from './components/profile-artworks/profile-artworks';
import ProfileHeader from './components/profile-header/profile-header';
import './profile.scss';

function AppProfile() {
  return (
    <div id="profile" className="page">
      <ProfileHeader></ProfileHeader>
      <ProfileArtworks></ProfileArtworks>
    </div>
  );
}

export default AppProfile;
