import { Artwork } from 'core/models/artworkModel';

export async function createArtwork(formData: FormData) {
  const LS_KEY = 'login-with-metamask:auth';
  const jwt = localStorage.getItem(LS_KEY);

  if (!jwt) {
    return;
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'x-access-token': jwt,
    },
    body: formData,
  };

  try {
    const message = await fetch(
      `http://localhost:8080/api/createArtwork`,
      requestOptions
    );
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteArtwork(id: string) {
  const LS_KEY = 'login-with-metamask:auth';
  const jwt = localStorage.getItem(LS_KEY);

  if (!jwt) {
    return;
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': jwt,
    },
    body: JSON.stringify({ id: id }),
  };
  try {
    await fetch(`http://localhost:8080/api/deleteArtwork`, requestOptions);
  } catch (error) {
    console.log(error);
  }
}

export async function getArtworksFrom(
  publicAddress: string
): Promise<[Artwork] | undefined> {
  try {
    const res = await fetch(
      `http://localhost:8080/api/userArtworks/${publicAddress}`
    );
    const artworks: [Artwork] = await res.json();
    return Promise.resolve(artworks);
  } catch (error) {
    console.log(error);
    return Promise.resolve(undefined);
  }
}

export async function getAdminContentArtworks(): Promise<
  [Artwork] | undefined
> {
  const LS_KEY = 'login-with-metamask:auth';
  const jwt = localStorage.getItem(LS_KEY);

  if (!jwt) {
    return;
  }
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': jwt,
    },
  };
  try {
    const res = await fetch(
      `http://localhost:8080/api/admin/contentArtworks`,
      requestOptions
    );
    const artworks: [Artwork] = await res.json();
    return Promise.resolve(artworks);
  } catch (error) {
    console.log(error);
    return Promise.resolve(undefined);
  }
}
