import sent from '../data/dummySent.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { subject, to, body: emailBody } = req.body;

      const newEmail = {
        body: emailBody,
        date: new Date().toISOString().split('T')[0],
        id: sent.length + 1,
        sender: "me",
        subject,
        to: "adrian"
      };

      sent.unshift(newEmail);

      res.status(200).json({ message: 'email success', newEmail });
    } catch (err) {
      res.status(400).json({ error: 'invalid data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
