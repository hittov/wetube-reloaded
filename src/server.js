// import 이름은 상관없다 import 변수이름 from 패키지이름
// server.js는 server 관련 코드만 처리
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
//  ./은 지금의 장소를 의미

const app = express();
const logger = morgan("dev");

// 라우터 express.Router();
// Router.get("URL", fn);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
// express.urlencoded form의 body를 이해함 / extended body에 있는 정보를 보기 좋게 형식을 갖춤

console.log(process.env.COOKIE_SECRET);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// request 요청하다 response 응답하다
// 브라우저가 서버에 request하면 서버는 response 응답한다
// middleware는 req와 rep 사이에 있다 > 요청 미들웨어 응답
// 모든 controller는 middleware가 있다 next(); > 다음 함수를 불러옴

// get은 path를 필요로 함 path는 URL = ("/")
// use는 어느 URL에도 작동하는 global middleware를 만들어 준다
// *순서 중요*

export default app;
