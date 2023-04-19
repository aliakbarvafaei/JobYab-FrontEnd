import { axiosInstance, tokenUser } from "../../config";
import { filtersInterface } from "../../ts/interfaces";

export const logoutAPI = () => axiosInstance.get(`/logout/`, tokenUser());

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
export const getSkills = () => axiosInstance.get("/skills/");
export const getStates = () => axiosInstance.get("/states/");
export const getCities = (stateId: number) =>
  axiosInstance.get(`/cities/${stateId}/`);
export const getJobTypes = () => axiosInstance.get("/jobtypes/");
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
export const getMessages = () =>
  axiosInstance.get("/contact-message/", tokenUser());
export const AddMessages = (message: any) =>
  axiosInstance.post("/contact-message/", message, tokenUser());
export const getBookmark = () =>
  axiosInstance.get("/posts/bookmark/", tokenUser());
export const RemoveBookmark = (postId: number) =>
  axiosInstance.delete(`/posts/bookmark/${postId}/`, tokenUser());
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
export const ChangeLevel = (data: any) =>
  axiosInstance.put("/credit/", data, tokenUser());
export const getUser = () => axiosInstance.get(`/getuser/`, tokenUser());

export const getmyhomes = () => axiosInstance.get(`/myhomes/`, tokenUser());

export const getAdsNew = () => axiosInstance.get("/homes/new/");

export const getAdsWithPage = (
  pageNumber: number,
  pageSize: number,
  filters: filtersInterface
) =>
  axiosInstance.post("/homesfilter/", {
    pageNumber: pageNumber,
    pageSize: pageSize,
    filters: filters,
  });

export const getAd = (idAd: string, source: string) =>
  axiosInstance.get(`/homes/${idAd}/${source}`);

export const putAd = (idAd: string, source: string) =>
  axiosInstance.put(`/homes/${idAd}/${source}`, tokenUser());

export const deleteAd = (idAd: string, source: string) =>
  axiosInstance.delete(`/homes/${idAd}/${source}`, tokenUser());

// export const getBookmark = (email: string) =>
//   axiosInstance.get(`/bookmark/${email}`, tokenUser());

export const postBookmark = (email: string, code: number) =>
  axiosInstance.post(
    `/bookmark/${email}`,
    {
      code: code,
    },
    tokenUser()
  );
export const deleteBookmark = (email: string, code: string) =>
  axiosInstance.delete(`/bookmark/${email}!${code}`, tokenUser());