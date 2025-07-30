const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1400131418742460522/n-rF4jBdTSWmCO--16DfaeRzg69gzRXke15N265G5gzL6UkDuKeENWhsGlY08NP_qAa0';

app.post('/submit-form', async (req, res) => {
  const { name, date, reason } = req.body;

  const message = {
    content: `📢 **แจ้งลาแก๊ง**\n👤 ชื่อ: ${name}\n📅 วันที่ลา: ${date}\n📝 เหตุผล: ${reason}`
  };

  try {
    await axios.post(DISCORD_WEBHOOK, message);
    console.log('✅ ส่ง webhook สำเร็จ');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook ส่งไม่สำเร็จ:', error.response?.data || error.message);
    res.status(500).json({ error: 'ส่ง webhook ไม่สำเร็จ' });
  }
});

app.listen(3001, () => {
  console.log('✅ Backend started at http://localhost:3001');
});
