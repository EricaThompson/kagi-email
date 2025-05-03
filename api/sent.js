import sent from '../data/dummySent.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json(sent);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
