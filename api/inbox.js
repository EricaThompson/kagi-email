import inbox from '../data/dummyInbox.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(inbox);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
