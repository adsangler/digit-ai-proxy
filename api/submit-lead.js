export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, full_name, company_name, score, max_score, version, timestamp } = req.body;
  const userId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

  try {
    await fetch("https://hooks.zapier.com/hooks/catch/22756592/2ppwfus/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        email,
        full_name,
        company_name,
        score,
        max_score,
        version,
        timestamp,
      }),
    });

    return res.status(200).json({ success: true, userId });
  } catch (err) {
    console.error("Lead submission error:", err);
    return res.status(500).json({ error: "Failed to submit lead" });
  }
}
