import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.headers.authorization;

  if (!token) {
    console.log('Token not provided');
    return res.status(403).json({ error: 'Token not provided inside headers' });
  }
  const [_, secret] = (token as string).split(' ');

  if (!secret || secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    return res.status(403).json({ error: 'Invalid secret provided' });
  }

  await res.unstable_revalidate('/');
  return res.status(200).json({ success: true });
}
