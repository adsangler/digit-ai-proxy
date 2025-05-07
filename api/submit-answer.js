export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
    const { userId, questionNumber, questionText, answer, answerScore } = req.body;
  
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/22756592/2nrfwnr/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          questionNumber,
          questionText,
          answer,
          answerScore,
        }),
      });
  
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Answer submission error:", err);
      return res.status(500).json({ error: "Failed to submit survey answer" });
    }
  }
  