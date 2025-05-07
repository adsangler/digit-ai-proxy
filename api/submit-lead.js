export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, full_name, company_name, score, max_score, version, timestamp } = req.body;

  if (!email || !full_name || !company_name) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/22756592/2ppwfus/";

    const zapierResponse = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        full_name,
        company_name,
        score,
        max_score,
        version,
        timestamp,
      }),
    });

    if (!zapierResponse.ok) {
      throw new Error(`Zapier returned status ${zapierResponse.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error forwarding to Zapier:", error);
    return res.status(500).json({ error: "Failed to forward lead." });
  }
}
