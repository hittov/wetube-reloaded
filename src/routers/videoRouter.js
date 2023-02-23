import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controller/videoController";
//  ..은 폴더에서 나가는걸 의미
const videoRouter = express.Router();

// :name > parameter url안에 변수를 포함 시켜줌 :id express에 변수라는 걸 알리기 위함
// 이름은 상관없지만 반드시 : 가 있어야함 없으면 그냥 텍스트
// respond 를 받아올때 express가 /:id 의 변수 중 하나라고 인식하기 때문에 upload를 위로
// "/:id(\\d+)" js 이기 때문 \\ 두개
// 숫자만 적용하는 정규식을 적용하면 upload 위치는 상관이없다
videoRouter.get("/:id(\\d+)", watch);
// 하나의 url에 get과 post 한번에 작성하는 shotcut 코드
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;
