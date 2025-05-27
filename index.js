const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const VAPI_KEY = process.env.VAPI_KEY || "sk-demo-key";

app.post('/startVapiCall', async (req, res) => {
  const { assistantId } = req.body;
  if (!assistantId) return res.status(400).json({ error: "Missing assistantId" });

  try {
    const response = await axios.post(
      "https://api.vapi.ai/assist",
      { assistantId },
      {
        headers: {
          Authorization: `Bearer ${VAPI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    const errMsg = (err.response && err.response.data) || err.message || "Unknown error";
    res.status(500).json({ success: false, error: errMsg });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
