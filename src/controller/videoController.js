// pug 랜더링 res.render("home");
// render명은 파일명과 같아야함 띄어쓰기 X 대문자 X
// render는 2개의 argument 1. view 이름 2. 템플릿 변수 {변수: "value" 원하는 만큼}
// const fakeUser = {
//   username: "pty",
//   loggedIn: false,
// };

// Mixins는 똑똑한 partial이다.
export const trending = (req, res) => {
  const videos = [
    {
      title: "First Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Third Video",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
  ];
  return res.render("home", { pageTitle: "Home", videos });
};

export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => {
  return res.send("Delete Video");
};
