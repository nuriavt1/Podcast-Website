import { createContext } from 'react';

const client_id = 'd21f9fa9e9834547a686c4595b539595';
const client_secret = '224cbbce3d5943cba4229f4d40b172ad';

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  });

  return await response.json();
}



export const LevelContext = createContext(getToken);
