import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import { useSelector } from "react-redux";
const BASE_URL = "https://realizdea.kuyrek.com";
// const TOKEN_URL =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmdWxsbmFtZSI6IlNlbGkgUm9zcmlhbmEiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwNjUxNzc3fQ.sOYqcBKjmY1I5jWtEd62BFOWqrlgooDiLM3AIAwXT1E";

export const getProfile = (token, userId) => {
  //   const TOKEN_URL = useSelector((state) => state.auth.token);
  return async (dispatch) => {
    try {
      //   const res = await Axios.get(`${BASE_URL}/user/profile`, {
      //     headers: {
      //       Authorization:
      //         "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmdWxsbmFtZSI6IlNlbGkgUm9zcmlhbmEiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwNjUxNzc3fQ.sOYqcBKjmY1I5jWtEd62BFOWqrlgooDiLM3AIAwXT1E",
      //     },
      //   });
      const res = await Axios({
        method: "GET",
        url: `${BASE_URL}/user/profile`,
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log("berhasil", res);

      const dataProfile = res.data.result;
      if (res.status == 200) {
        dispatch({ type: "GET_PROFILE", payload: dataProfile });
        console.log("Ini data profile", res);
      }
    } catch (error) {
      console.log("Ini data error profile");
      console.log(error);
    }
  };
};

export const updateProfile = (
  token,
  userId,
  firstname,
  lastname,
  location,
  bank,
  account_number,
  photo,
  photoName,
  photoType
) => {
  const FormData = require("form-data");
  const dataForm = new FormData();
  dataForm.append("picture", {
    name: photoName,
    uri: photo,
    type: photoType,
  });
  dataForm.append("first_name", firstname);
  dataForm.append("last_name", lastname);
  dataForm.append("bank", bank);
  dataForm.append("acc_number", account_number);
  dataForm.append("location", location);
  // dataForm.append("picture", picture);

  return async (dispatch) => {
    try {
      const resUpdate = await Axios.patch(
        `${BASE_URL}/user/profile/update/${userId}`,
        dataForm,
        {
          headers: {
            Authorization: `bearer ${token}`,
            "Content-Type":
              "multipart/form-data; " + "boundary=" + data._boundary,
            accept: "application/json",
            // 'Content-Type': 'application/json'
            // ...dataForm.getHeaders(),
          },
          data: dataForm,
        }
      );
      if (resUpdate.status == 200) {
        console.log("berhasil updateeeeeee");
        // /api/v1/profile
        const res = await Axios.get(`${BASE_URL}/user/profile`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        const dataProfile = res.data.result;
        if (res.status == 200) {
          dispatch({ type: "GET_PROFILE", payload: dataProfile });
          console.log("Ini data updateprofile", resUpdate);
          dispatch({ type: "LOADING" });
          dispatch({
            type: "TOAST",
            toastMessage: "Profile has been updated!",
          });
        } else {
          dispatch({ type: "LOADING" });
          dispatch({
            type: "TOAST",
            toastMessage: "Something wrong , try again!",
          });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING" });
      dispatch({ type: "TOAST", toastMessage: "Something wrong , try again!" });
    }
  };
};
