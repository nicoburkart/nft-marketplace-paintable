export async function updateAccountName(name: string) {
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
    body: JSON.stringify({ name: name }),
  };
  try {
    await fetch(`http://localhost:8080/api/updateUser`, requestOptions);
  } catch (error) {
    console.log(error);
  }
}
