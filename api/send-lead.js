export default function handler(req, res) {
  // 1. Set CORS headers to allow outside access
  res.setHeader('Access-Control-Allow-Origin', '*'); // or replace * with specific domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Handle preflight (browser's test request)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Handle actual POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 4. Process data sent to you
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

  // 5. Respond back
  res.status(200).json({ success: true });
}
