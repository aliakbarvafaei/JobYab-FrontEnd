import DefaultLayout from "../layouts/Default";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import NewPost from "../pages/NewPost";
import SearchPage from "../pages/SearchPage";
import PostPage from "../pages/PostPage";
import companyPage from "../pages/companyPage";
import ProfileUser from "../pages/Profile";
import ProfileCompany from "../pages/ProfileCompany";

const indexRoutes = [{ path: "/", component: DefaultLayout }];

const AppRoutes: Array<any> = [
  {
    path: ["/home", "/"],
    name: "داشبورد",
    icon: "fa fa-tachometer-alt",
    component: Home,
    showInNav: true,
    private: false,
  },
  {
    path: "/profile-company/new-post",
    name: "همه محصولات",
    icon: "fa fa-list",
    component: NewPost,
    showInNav: false,
    private: true,
  },
  {
    path: "/profile-company",
    name: "همه محصولات",
    icon: "fa fa-list",
    component: ProfileCompany,
    showInNav: false,
    private: true,
  },
  {
    path: "/search",
    name: "جستجو",
    icon: "fa fa-list",
    component: SearchPage,
    showInNav: false,
    private: false,
  },
  {
    path: "/postPage/:id",
    name: "صفحه آگهی",
    icon: "fa fa-list",
    component: PostPage,
    showInNav: false,
    private: false,
  },
  {
    path: "/company/:companyId",
    name: "اطلاعات شرکت",
    icon: "fa fa-list",
    component: companyPage,
    showInNav: false,
    private: false,
  },
  {
    path: "/profile",
    name: "پروفایل",
    icon: "fa fa-list",
    component: ProfileUser,
    showInNav: false,
    private: true,
  },

  {
    path: "/login",
    name: "ورود",
    icon: "fa fa-plus",
    component: LoginPage,
    showInNav: false,
  },
  {
    path: ["*", "/not-found"],
    name: "صفحه یافت نشد",
    icon: "fa fa-tachometer-alt",
    component: NotFound,
    showInNav: true,
    private: false,
  },
  // { path: '/', pathTo: '/home', name: 'Dashboard', redirect: true },
];

export default AppRoutes;

export { indexRoutes };
