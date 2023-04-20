import { axiosInstance, tokenUser } from "../../config";
import { filtersInterface } from "../../ts/interfaces";

export const logoutAPI = () => axiosInstance.get(`/logout/`, tokenUser());

/** User */
export const loginUserAPI = (email: string, password: string) =>
  axiosInstance.post("/jobseeker_login/", {
    username: email,
    password: password,
  });
export const registerUserAPI = (data: any) =>
  axiosInstance.post("/jobseeker_register/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateUserAPI = (data: any) =>
  axiosInstance.put("/jobseeker_update/", data, tokenUser());
/** */

/** Company */
export const loginCompanyAPI = (email: string, password: string) =>
  axiosInstance.post("/employer_login/", {
    username: email,
    password: password,
  });
export const registerCompanyAPI = (data: any) =>
  axiosInstance.post("/employer_register/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateCompanyAPI = (data: any) =>
  axiosInstance.put("/employer_update/", data, tokenUser());
/** */

/** User & Company */
export const sendEmailAPI = (email: string) =>
  axiosInstance.post("/send_mail/", {
    username: email,
  });
export const sendEmailForgetPassAPI = (email: string) =>
  axiosInstance.post("/send_forget_pass_email/", {
    username: email,
  });
export const activateAccountAPI = (code: string) =>
  axiosInstance.post("/active_account/", {
    email_active_code: code,
  });
export const resetPassAPI = (code: string, newPass: string) =>
  axiosInstance.post("/reset_pass/", {
    email_active_code: code,
    password: newPass,
  });
/** */

/** Post */
export const NewPost = (data: any) =>
  axiosInstance.post("/posts/", data, tokenUser());
export const getPost = (postId: number) =>
  axiosInstance.get(`/posts/${postId}/`);
export const UpdatePost = (data: any, postId: number) =>
  axiosInstance.put(`/posts/${postId}/`, data, tokenUser());
export const RemovePost = (postId: number) =>
  axiosInstance.delete(`/posts/${postId}/`, tokenUser());
export const getMyPosts = () =>
  axiosInstance.get("/posts/myposts/", tokenUser());
/** */

/** Messages */
export const getMessages = () =>
  axiosInstance.get("/contact-message/", tokenUser());
export const AddMessages = (message: any) =>
  axiosInstance.post("/contact-message/", message, tokenUser());
/** */

/** Bookmark */
export const getBookmark = () =>
  axiosInstance.get("/posts/bookmark/", tokenUser());
export const RemoveBookmark = (postId: number) =>
  axiosInstance.delete(`/posts/bookmark/${postId}/`, tokenUser());
export const postBookmark = (id: string) =>
  axiosInstance.post(
    `/posts/bookmark/`,
    {
      post: id,
    },
    tokenUser()
  );
/** */

/** Resume */
export const getMySentResumes = (state: number) =>
  axiosInstance.get(`/applicant/requests/?state=${state}`, tokenUser());
export const getMyReciveResumes = (state: number) =>
  axiosInstance.get(`/employer/requests/?state=${state}`, tokenUser());
export const changeStateResume = (id: number, data: any) =>
  axiosInstance.post(`/employer/request-state/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${JSON.parse(
        localStorage.getItem("token_user") as string
      )}`,
    },
  });
export const sendResume = (postId: string, resume: any) =>
  axiosInstance.post(
    `/applicant/requests/`,
    {
      post: postId,
      resume: resume,
    },
    tokenUser()
  );
/** */

export const ChangeLevel = (data: any) =>
  axiosInstance.put("/credit/", data, tokenUser());
export const getUser = () => axiosInstance.get(`/getuser/`, tokenUser());

/** Posts */
export const getPrivatePosts = (
  pageNumber: number,
  pageSize: number,
  searchInput: string,
  category: string,
  province: string
) =>
  axiosInstance.post(`/postsfilter/`, {
    pageNumber: pageNumber,
    pageSize: pageSize,
    filters: {
      searchInput: searchInput,
      category: category,
      province: province,
    },
  });
export const getTotalPosts = () => axiosInstance.get(`/posts/`, tokenUser());
// export const getPrivatePosts = () => axiosInstance.get(`/posts/`);

export const getPostDetail = (idAd: string) =>
  axiosInstance.get(`/posts/${idAd}/`);

export const getSimilarPosts = (idAd: string) =>
  axiosInstance.get(`/posts/related/${idAd}/`);

export const getCompaniesPostsPublic = (id: string) =>
  axiosInstance.get(`/posts/company/${id}/`);
/** */

/** General */
export const getStates = () => axiosInstance.get(`/states/`);

export const getJobTypes = () => axiosInstance.get(`/jobtypes/`);
export const getUrgentPosts = () =>
  axiosInstance.get(`/posts/urgent/`, tokenUser());
export const getRecentPosts = () =>
  axiosInstance.get(`/posts/recent/`, tokenUser());

export const getSkills = () => axiosInstance.get("/skills/");

export const getCities = (stateId: number) =>
  axiosInstance.get(`/cities/${stateId}/`);

/** */
