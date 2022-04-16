const _getAccessToken = async () => {
  return await (
    await fetch(`${process.env.NEXT_PUBLIC_AUTH0_ORIGIN}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_AUTH0_API_SECRET,
        audience: process.env.NEXT_PUBLIC_AUTH0_API_ORIGIN,
      }),
    })
  ).json();
};

const getEntity = async (
  entity: string,
  params?: { [key: string]: string | number },
) => {
  let paramsJoined;
  if (params) {
    paramsJoined = Object.entries(params)
      .map(([key, value]) => {
        return `${key}:"${value}"`;
      })
      .join('&');
  }

  let searchString = process.env.NEXT_PUBLIC_AUTH0_API_ORIGIN + '' + entity;
  if (paramsJoined) {
    searchString += '?q=' + paramsJoined;
  }

  const tokenData = await _getAccessToken();

  const returnEntity = await (
    await fetch(searchString, {
      headers: {
        Authorization: 'Bearer ' + tokenData.access_token,
      },
    })
  ).json();

  return returnEntity;
};

export default getEntity;
