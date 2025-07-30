// index.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // ใช้ .env สำหรับ config

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

if (!DISCORD_WEBHOOK) {
  console.error("❌ ไม่พบ DISCORD_WEBHOOK ใน .env");
  process.exit(1);
}

app.post('/submit-form', async (req, res) => {
  const { name, date, reason } = req.body;

  if (!name || !date || !reason) {
    return res.status(400).json({ error: 'ข้อมูลไม่ครบ' });
  }

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

app.get('/', (req, res) => {
  res.send("😎 ฟอร์มลาแก๊ง backend พร้อมใช้งาน");
});

app.listen(PORT, () => {
  console.log(`✅ Backend started at http://localhost:${PORT}`);
});
