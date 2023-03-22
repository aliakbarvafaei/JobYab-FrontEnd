import { axiosInstance, configToken } from "../../config";
import { filtersInterface } from "../../ts/interfaces";

export const logoutAPI = () => axiosInstance.get(`/logout/`, configToken());

export const loginAPI = (email : string, password : string) =>
  axiosInstance.post(
    "/login/",
    {
      username: email,
      password: password
    }
  );
export const registerAPI = (fname : string, callNumber : string, email : string, password : string, address: string, bio: string) =>
  axiosInstance.post(
    "/register/",
    {
      full_name: fname,
      phone_number: callNumber,
      username: email,
      password: password,
      address: address,
      bio: bio
    }
  );
export const sendEmailAPI = (email : string) =>
  axiosInstance.post(
    "/send_mail/",
    {
      username: email,
    }
  );
export const sendEmailForgetPassAPI = (email : string) =>
  axiosInstance.post(
    "/send_forget_pass_email/",
    {
      username: email,
    }
  );
export const activateAccountAPI = (code : string) =>
  axiosInstance.post(
    "/active_account/",
    {
      email_active_code: code,
    }
  );
export const resetPassAPI = (code : string, newPass : string) =>
  axiosInstance.post(
    "/reset_pass/",
    {
      email_active_code: code,
      password: newPass
    }
  );
export const NewAdAPI = (token : string, category : string, type : string, status : string, city : string, region : number, neighbor: string, room : number, year : number, elevator : boolean, parking : boolean, lobby : boolean, sports_hall : boolean, guard : boolean,swimming_pool : boolean, balcony : boolean, roof_garden : boolean, remote_door : boolean, meterage : number, price : number, main_image : string, image_1 : string, image_2 : string, image_3 : string, title : string, callNumber : string, bio : string, creator: string, warehouse: boolean, location_x : number, location_y: number) =>
  axiosInstance.post(
    "/homes_create/",
    {
      category: category,
      type: type,
      status: status,
      province: city,
      region: region,
      neighbor: neighbor,
      num_of_beds: room,
      age: year,
      elevator: elevator,
      parking: parking,
      lobby: lobby,
      sports_hall: sports_hall,
      guard: guard,
      swimming_pool: swimming_pool,
      balcony: balcony,
      roof_garden: roof_garden,
      remote_door: remote_door,
      floor_area: meterage,
      total_price: price,
      main_image: main_image,
      image_1: image_1,
      image_2: image_2,
      image_3: image_3,
      title: title,
      phone_number: callNumber,
      description: bio,
      seller: creator,
      warehouse: warehouse,
      location_x: location_x,
      location_y: location_y
    },
    configToken()
  );
export const EditAdAPI = (idAd : string ,source : string ,token : string, category : string, type : string, status : string, city : string, region : number, neighbor: string, room : number, year : number, elevator : boolean, parking : boolean, lobby : boolean, sports_hall : boolean, guard : boolean,swimming_pool : boolean, balcony : boolean, roof_garden : boolean, remote_door : boolean, meterage : number, price : number, main_image : string, image_1 : string, image_2 : string, image_3 : string, title : string, callNumber : string, bio : string, creator: string, warehouse: boolean, location_x : number, location_y: number) =>
  axiosInstance.put(
    `/homes/${idAd}/${source}`,
    {
      category: category,
      type: type,
      status: status,
      province: city,
      region: region,
      neighbor: neighbor,
      num_of_beds: room,
      age: year,
      elevator: elevator,
      parking: parking,
      lobby: lobby,
      sports_hall: sports_hall,
      guard: guard,
      swimming_pool: swimming_pool,
      balcony: balcony,
      roof_garden: roof_garden,
      remote_door: remote_door,
      floor_area: meterage,
      total_price: price,
      main_image: main_image,
      image_1: image_1,
      image_2: image_2,
      image_3: image_3,
      title: title,
      phone_number: callNumber,
      description: bio,
      seller: creator,
      warehouse: warehouse,
      location_x: location_x,
      location_y: location_y
    },
    configToken()
  );
export const updateCreditAPI = (level: number) =>
  axiosInstance.put(
    "/credit/",
    {
      level: level,
    },
    configToken()
  );
// export const PredictAPI = (type : string, city : string, region : string, room : string, year : string, floor : string, elevator : string, parking : string, meterage : string, warehouse: string) =>
//   axiosInstance.post(
//     "/predict",
//     {
//       type: type,
//       city: city,
//       region: region,
//       room: room,
//       year: year,
//       floor: floor,
//       elevator: elevator,
//       parking: parking,
//       meterage: meterage,
//       warehouse: warehouse
//     },
//     configToken()
//   );

export const getUser = () => axiosInstance.get(
    `/getuser/`,
    configToken()
  );

export const getmyhomes = () => axiosInstance.get(
    `/myhomes/`,
    configToken()
  );

// export const updatePassword = (email : string, LastPassword : string, NewPassword : string) =>
//   axiosInstance.patch(
//     `/user/${email}`,
//     {
//       LastPassword: LastPassword,
//       NewPassword: NewPassword,
//     },
//     configToken()
//   );

// export const getAds = () => axiosInstance.get("/ads", configToken());

export const getAdsNew = () => axiosInstance.get("/homes/new/");

export const getAdsWithPage = (pageNumber : number, pageSize : number, filters : filtersInterface) =>
  axiosInstance.post(
    "/homesfilter/",
    {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: filters,
    }
  );

export const getAd = (idAd : string, source : string) =>
  axiosInstance.get(`/homes/${idAd}/${source}`);

export const putAd = (idAd : string, source : string) =>
  axiosInstance.put(`/homes/${idAd}/${source}`, configToken());

export const deleteAd = (idAd : string, source : string) =>
  axiosInstance.delete(`/homes/${idAd}/${source}`, configToken());

export const getBookmark = (email : string) =>
  axiosInstance.get(`/bookmark/${email}`, configToken());

export const postBookmark = (email : string, code : number) =>
  axiosInstance.post(
    `/bookmark/${email}`,
    {
      code: code,
    },
    configToken()
  );
export const deleteBookmark = (email : string, code : string) =>
  axiosInstance.delete(`/bookmark/${email}!${code}`, configToken());

// export const deleteCart = (email : string, code : string) =>
//   axiosInstance.delete(`/cart/${email}!${code}`, configToken());

// export const updateCart = (email : string, code : string, quantity : string) =>
//   axiosInstance.patch(
//     `/cart/${email}!${code}`,
//     {
//       quantity: quantity,
//     },
//     configToken()
//   );
