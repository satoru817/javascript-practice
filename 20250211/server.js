require('dotenv').config(); //dotenvで環境変数を読み込む
const express = require('express');
const app = express();

//静的ファイルを提供
app.use(express.static('public'));

//APIエンドポイントで環境変数を渡す
app.get('/api/config', (req, res) => {
  res.json({ apiKey: process.env.API_KEY }); //環境変数を返す
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
