/* pug 랜더링 res.render("home");
 render명은 파일명과 같아야함 띄어쓰기 X 대문자 X
 render는 2개의 argument 1. view 이름 2. 템플릿 변수 {변수: "value" 원하는 만큼}
 const fakeUser = {
   username: "pty",
   loggedIn: false,
 };
 Mixins는 똑똑한 partial이다.
 videos:videos = videos(ES6)방식 */
import Video from "../models/Video";
/* Video.find({}, (error, videos) => {
  res.render("home", { pageTitle: "Home", videos });
}); */

/* return은 함수의 마무리 짓는 역할로 사용
   render한 것은 재사용 불가능 express 오류*/
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  // const id = req.pramas.id;
  const { id } = req.params; // ES6 방식
  const video = await Video.findById(id);
  if (!video) {
    // 에러 체크 먼저
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
// getEdit form 화면에 보여주는 녀석
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
// postEdit 변경사항 저장해주는 녀석
// redirect 브라우저가 자동으로 이동 하도록 하는 것
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  // startsWith() 특정 문자로 시작하는지 확인하여 결과를 true/false 반환
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "UploadVideo" });
};

export const postUpload = async (req, res) => {
  try {
    const { title, description, hashtags } = req.body;
    await Video.create({
      // Video.create = (const video = new Video) class instance 생성과정 생략하고 바로 DB에 저장
      title,
      description,
      // createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
      // meta: {
      //   views: 0,
      //   rating: 0,
      // },
    });
    // await video.save(); // save()는 promise를 return / await > 저장 되는 걸 기다려야 한다
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "UploadVideo",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
    console.log(videos);
  }
  return res.render("search", { pageTitle: "Search", videos });
};
