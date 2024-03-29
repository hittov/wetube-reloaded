import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controller/userController";
import { home, search } from "../controller/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

// router와 controller를 섞어서 쓰는건 좋지 않다. 폴더를 나눈다.
// globalController는 필요가 없다. url을 깔끔하게 하기위해 쓰는 것 일 뿐

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

// 다른 js에 import하려면 exprot 해야한다.
// defalut의 기능   1. import시 이름 다르게 해도 됨 하지만 보통 같게 함
//                  2. export defalut는 단 하나 밖에 export 하지 못함.
//                  3. controller 전부다 import 하는 법 {object} ex) {edit, watch}을 넣는다.
export default rootRouter;
