// import 이름은 상관없다 import 변수이름 from 패키지이름
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
//  ./은 지금의 장소를 의미
const PORT = 4000;

console.log(process.cwd());

const app  = express();
const logger = morgan("dev");

// 라우터 express.Router();
// Router.get("URL", fn);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


// request 요청하다 response 응답하다
// 브라우저가 서버에 request하면 서버는 response 응답한다
// middleware는 req와 rep 사이에 있다 > 요청 미들웨어 응답
// 모든 controller는 middleware가 있다 next(); > 다음 함수를 불러옴

// get은 path를 필요로 함 path는 URL = ("/")
// use는 어느 URL에도 작동하는 global middleware를 만들어 준다 
// *순서 중요*


const handleListeing = () => console.log(`Server listenting on port http://localhost:${PORT} ✔`);

// port는 컴퓨터의 창문이나 문 같은 것 가고자 하는 문은 url로 정해짐 (routes)
app.listen(PORT, handleListeing);