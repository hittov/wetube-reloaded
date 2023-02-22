// pug 랜더링 res.render("home");
// render명은 파일명과 같아야함 띄어쓰기 X 대문자 X
// render는 2개의 argument 1. view 이름 2. 템플릿 변수 {변수: "value" 원하는 만큼}
// const fakeUser = {
//   username: "pty",
//   loggedIn: false,
// };

// Mixins는 똑똑한 partial이다.
let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];
// videos:videos = videos(ES6)방식
export const trending = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
  // const id = req.pramas.id;
  const { id } = req.params; // ES6 방식
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};
// getEdit form 화면에 보여주는 녀석
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};
// postEdit 변경사항 저장해주는 녀석
// redirect 브라우저가 자동으로 이동 하도록 하는 것
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; // = cosnt title = req.body.title;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
