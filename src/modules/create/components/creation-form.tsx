import { ChangeEvent, useState } from 'react';
import CollectionCard from 'shared/components/collection-card/collection-card';
import './creation-form.scss';

import watercolorStyle from 'assets/images/watercolor.jpg';
import newspaperStyle from 'assets/images/newspaper.jpg';
import abstractStyle from 'assets/images/abstract.jpg';
import { useAppSelector } from 'hooks';
import { createArtwork } from 'core/services/artwork.service';

function CreationForm() {
  let [formData, setFormData] = useState({
    title: '',
    description: '',
    contentImage: '',
    artStyle: '',
    tokenAmount: 0,
    initialTokenPrice: 0,
  });

  const account = useAppSelector((state) => state.account);

  function displayImage(event: ChangeEvent) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const imageSrc = e.target.result as string;
          setFormData({ ...formData, contentImage: imageSrc });
        }
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      setFormData({ ...formData, contentImage: '' });
    }
  }

  function updateFormState(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.name === 'contentImage') {
      return;
    }
    setFormData({ ...formData, [input.name]: input.value });
  }

  function createNFT(event: any) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    createArtwork(formData);
  }

  return (
    <section id="creation-form-wrapper">
      <h2 className="section-header">Create Pet Portrait NFT</h2>

      <div className="section-body">
        <form onSubmit={createNFT} className="form" onChange={updateFormState}>
          <div className="input-group">
            <label className="input-label" htmlFor="imageUpload">
              Upload Picture
            </label>
            <div className="image-upload-wrapper">
              {formData.contentImage.length === 0 && (
                <div className="upload-box">
                  <p>PNG, JPG, JPEG</p>
                  <button className="light-blue-btn">Upload</button>
                </div>
              )}
              {formData.contentImage.length > 0 && (
                <div className="upload-box">
                  <img src={formData.contentImage} alt="" />
                </div>
              )}
              <input
                type="file"
                name="contentImage"
                accept="image/jpeg, image/png, image/jpg"
                id="imageUpload"
                className="form-control"
                onChange={displayImage}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Select Art-Style</label>
            <div className="radio-group">
              <div className="radio-artstyle-wrapper">
                <input
                  type="radio"
                  name="artStyle"
                  id="artStylesAbstract"
                  className="form-control"
                  value="abstract"
                />
                <div className="radio-button-image">
                  <img src={abstractStyle} alt="" />
                </div>
              </div>
              <div className="radio-artstyle-wrapper">
                <input
                  type="radio"
                  name="artStyle"
                  id="artStylesNewspaper"
                  className="form-control"
                  value="newspaper"
                />
                <div className="radio-button-image">
                  <img src={newspaperStyle} alt="" />
                </div>
              </div>
              <div className="radio-artstyle-wrapper">
                <input
                  type="radio"
                  name="artStyle"
                  id="artStylesWatercolor"
                  className="form-control"
                  value="watercolor"
                />
                <div className="radio-button-image">
                  <img src={watercolorStyle} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="tokenAmount">
              Available Tokens
            </label>
            <input
              type="number"
              required
              name="tokenAmount"
              id="tokenAmount"
              className="form-control"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="tokenPrice">
              Price per Token
            </label>
            <input
              type="number"
              name="initialTokenPrice"
              id="tokenPrice"
              className="form-control"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="collectionTitle">
              Collection Title
            </label>
            <input
              type="text"
              name="title"
              id="collectionTitle"
              className="form-control"
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="collectionDescription">
              Collection Description
            </label>
            <input
              type="text"
              name="description"
              id="collectionDescription"
              className="form-control"
            />
          </div>

          <button type="submit" className="primary-btn">
            Create NFT Collection
          </button>
        </form>
        <div className="preview">
          <p className="input-label">Preview</p>
          <CollectionCard account={account} artwork={formData}></CollectionCard>
        </div>
      </div>
    </section>
  );
}

export default CreationForm;
