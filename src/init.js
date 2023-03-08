// init.js는 서버를 시작하는데 필요한 모든 것들을 import 시키는 역할
import "dotenv/config";

console.log(process.env.DB_URL);

import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 5000;

const handleListeing = () =>
  console.log(`✅Server listenting on http://localhost:${PORT}`);

// port는 컴퓨터의 창문이나 문 같은 것 가고자 하는 문은 url로 정해짐 (routes)
app.listen(PORT, handleListeing);
