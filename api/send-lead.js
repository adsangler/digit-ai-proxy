export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/22756592/2ppwfus/';

    const zapierRes = await fetch(zapierWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await zapierRes.text();
    res.status(zapierRes.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
}
