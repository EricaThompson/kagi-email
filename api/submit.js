import sent from '../data/dummySent.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
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

      return res.status(200).json({ message: 'email success', newEmail });
    } catch (err) {
      return res.status(400).json({ error: 'invalid data' });
    }
  } 

    return res.status(405).json({ error: 'Method not allowed' });

}
