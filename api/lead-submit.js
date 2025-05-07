module.exports = function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, full_name, company_name, score, max_score, version, timestamp } = req.body;

  console.log('Received lead:', {
    email,
    full_name,
    company_name,
    score,
    max_score,
    version,
    timestamp,
  });

  res.status(200).json({ success: true });
};
