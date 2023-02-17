import express, { request, response } from "express";

const PORT = 4000;

const app  = express();

// request 요청하다 response 응답하다
// 브라우저가 서버에 request하면 서버는 response 응답한다
// middleware는 req와 rep 사이에 있다 > 요청 미들웨어 응답
// 모든 controller는 middleware가 있다 next(); > 다음 함수를 불러옴
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    return res.send("I love middlewares");
};

const handleLogin = (req, res) => {
    return res.send("login");
}

// get은 path를 필요로 함 path는 URL = ("/")
// use는 어느 URL에도 작동하는 global middleware를 만들어 준다 
// *순서 중요*
app.get("/", logger, handleHome);
app.get("/login", handleLogin);

const handleListeing = () => console.log(`Server listenting on port http://localhost:${PORT} ✔`);

// port는 컴퓨터의 창문이나 문 같은 것 가고자 하는 문은 url로 정해짐 (routes)
app.listen(PORT, handleListeing);