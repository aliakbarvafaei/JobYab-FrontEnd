import DefaultLayout from "../layouts/Default";
// import Cart from "../pages/Cart";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
// import NotFound from "../pages/NotFound";
// import adDetail from "../pages/adDetail";
// import Profile from "../pages/Profile";
import RegisterPage from "../pages/Register";
import SearchPage from "../pages/SearchPage";
import Bookmark from "../pages/Bookmark";
import Predict from "../pages/Predict";
import NewAd from "../pages/NewAd";
import AdDetails from "../pages/AdDetails";
import ActiveAccount from "../pages/ActiveAccount";
import ResetPass from "../pages/ResetPass";
import ResetPass2 from "../pages/ResetPass2";
import EditAd from "../pages/EditAd";

const indexRoutes = [{ path: "/", component: DefaultLayout }];

const AppRoutes:Array<any> = [
  {
    path: ["/home", "/"],
    name: "داشبورد",
    icon: "fa fa-tachometer-alt",
    component: Home,
    showInNav: true,
    private: false,
  },
  {
    path: "/predict",
    name: "پیش‌بینی",
    icon: "fa fa-list",
    component: Predict,
    showInNav: false,
    private: false,
  },
  {
    path: "/new-ad",
    name: "آگهی جدید",
    icon: "fa fa-list",
    component: NewAd,
    showInNav: false,
    private: true,
  },
  {
    path: "/ad-details/:idad/:source",
    name: "همه محصولات",
    icon: "fa fa-list",
    component: AdDetails,
    showInNav: false,
    private: false,
  },
  {
    path: "/ad-edit/:idad/:source",
    name: "همه محصولات",
    icon: "fa fa-list",
    component: EditAd,
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
    path: "/bookmark",
    name: "نشان‌ شده‌ها",
    icon: "fa fa-list",
    component: Bookmark,
    showInNav: false,
    private: true,
  },
  {
    path: "/activeaccount",
    name: "فعال‌سازی حساب",
    icon: "fa fa-list",
    component: ActiveAccount,
    showInNav: false,
    private: false,
  },
  {
    path: "/forgetpassword",
    name: "بازیابی رمز",
    icon: "fa fa-list",
    component: ResetPass,
    showInNav: false,
    private: false,
  },
  {
    path: "/forgetpassword2",
    name: "بازیابی رمز",
    icon: "fa fa-list",
    component: ResetPass2,
    showInNav: false,
    private: false,
  },
  // {
  //   path: "/cart",
  //   name: "cart",
  //   icon: "fa fa-list",
  //   component: Cart,
  //   showInNav: false,
  //   private: true,
  // },
  {
    path: "/profile",
    name: "پروفایل",
    icon: "fa fa-list",
    component: Profile,
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
    path: "/register",
    name: "ثبت نام",
    icon: "fa fa-plus",
    component: RegisterPage,
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
