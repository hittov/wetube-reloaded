import express from "express";
import {watch, edit} from "../controller/videoControllers";
//  ..은 폴더에서 나가는걸 의미
const videoRouter = express.Router();

videoRouter.get("/watch", watch);
videoRouter.get("/edit", edit);

export default videoRouter;