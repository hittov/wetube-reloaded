// pug 랜더링 res.render("home");
// render명은 파일명과 같아야함 띄어쓰기 X 대문자 X
// render는 2개의 argument 1. view 이름 2. 템플릿 변수 {변수: "value" 원하는 만큼}
// const fakeUser = {
//   username: "pty",
//   loggedIn: false,
// };
// Mixins는 똑똑한 partial이다.
// videos:videos = videos(ES6)방식
import Video from "../models/Video";

export const home = (req, res) => {
  console.log("Start");
  Video.find({}, (error, videos) => {
    console.log("Search Finished");
    return res.render("home", { pageTitle: "Home", videos: [] });
  });
};

export const watch = (req, res) => {
  // const id = req.pramas.id;
  const { id } = req.params; // ES6 방식

  return res.render("watch", { pageTitle: `Watching` });
};
// getEdit form 화면에 보여주는 녀석
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};
// postEdit 변경사항 저장해주는 녀석
// redirect 브라우저가 자동으로 이동 하도록 하는 것
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // = cosnt title = req.body.title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "UploadVideo" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};
