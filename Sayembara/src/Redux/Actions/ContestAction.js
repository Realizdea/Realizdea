import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";

// const BASE_URL = "https://sayembara.herokuapp.com";
const NEW_URL = "https://realizdea.kuyrek.com";

export const getContest = (token) => {
  return async (dispatch) => {
    try {
      //menampilkan result dari getContest
      const resContest = await Axios.post(
        `${NEW_URL}/contest/getAllContest?page=1`,
        {
          contest: "logo",
        }
      );
      // const resSubmission = await Axios.get(
      //   `${NEW_URL}/contest/submission/1?page=1`,
      //   {
      //     headers: {
      //       Authorization: `bearer ${token}`,
      //     },
      //   }
      // );
      // console.log(resContest.data.result)
      const dataContest = resContest.data.result;
      if (resContest.status == 200) {
        dispatch({ type: "GET_ALL_CONTEST", allContest: dataContest });
        console.log("data Router", dataContest);

        const resDetailContest = await Axios.post(
          `${NEW_URL}/contest/getAllContest?page=1`
        );
        const dataDetailContest = resDetailContest.data.result.prize;
        // const submission = resSubmission.data.result;
        if (resDetailContest.status == 200) {
          dispatch({
            type: "GET_DETAIL_CONTEST",
            payload: dataDetailContest,
          });
          // dispatch({ type: "LOADING" });
          console.log("data detailsss", dataDetailContest);
        } else {
          dispatch({
            type: "GET_DETAIL_CONTEST",
            payload: dataDetailContest,
          });
          // dispatch({ type: "LOADING" });
          console.log("data kosong");
        }
        console.log(dataDetailContest, "data detail contest line 47");

        // const submission = await Axios.get(`${NEW_URL}/contest/submission/1`);
        // console.log(submission, "ini error submission");
        // const resSubmission = await Axios.get(`${NEW_URL}`)
        // const submission = resDetailContest.data.data.detail_submission;
        // if (resDetailContest.status == 200 && resDetailContest.data.data !== null) {
        //     dispatch({ type: "GET_DETAIL_CONTEST", payload: dataDetailContest, submission: submission })
        //     dispatch({ type: "LOADING" })
        //     console.log("data detailsss", dataDetailContest)
        //     console.log("data submission", submission)
        //     console.log("data submissionssss", resDetailContest.data.data)

        // }else {
        //     dispatch({ type: "GET_DETAIL_CONTEST", payload: dataDetailContest, submission: submission })
        //     dispatch({ type: "LOADING" })
        //     console.log("data kosong")

        // }

        // const resDetailContest = await Axios.get(`${BASE_URL}/api/v1/contest/detail/1?limit=10&page=1`)
        // const dataDetailContest = resDetailContest.data.data
        // const submission = resDetailContest.data.data.detail_submission
        // if (resDetailContest.status == 200 && resDetailContest.data.data !== null) {
        //     dispatch({ type: "GET_DETAIL_CONTEST", payload: dataDetailContest, submission: submission })
        //     dispatch({ type: "LOADING" })
        //     console.log("data detailsss", dataDetailContest)
        //     console.log("data submission", submission)
        //     console.log("data submissionssss", resDetailContest.data.data)

        // }else {
        //     dispatch({ type: "GET_DETAIL_CONTEST", payload: dataDetailContest, submission: submission })
        //     dispatch({ type: "LOADING" })
        //     console.log("data kosong")

        // }
      }
    } catch (error) {
      console.log(error.data);
    }
  };
};
//untuk menampilkan semua kontes
export const getAllContest = (title) => {
  return async (dispatch) => {
    try {
      // /api/v1/contest?limit=10&page=1&title=
      const resContest = await Axios.post(
        `${NEW_URL}/contest/getAllContest?page=1&title=${title}`
      );
      const dataContest = resContest.data.result;
      // data.data.rows
      dispatch({ type: "GET_ALL_CONTEST", allContest: dataContest });
      if (resContest.status == 200 && dataContest !== "not found") {
        // console.log("data Router search", dataContest)
        // dispatch({ type: "LOADING" });
      } else {
        // dispatch({ type: "LOADING" });
        dispatch({ type: "GET_ALL_CONTEST", allContest: [] });
        dispatch({ type: "TOAST", toastMessage: "Data not found" });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailContest = (idContest) => {
  return async (dispatch) => {
    try {
      const resDetailContest = await Axios.get(
        `${NEW_URL}/contest/submission/${idContest}`
      );
      const dataDetailContest = resDetailContest.data.result.id;
      console.log(dataDetailContest, "ini data detail contest line 121");
      // const submission = resDetailContest.data.data.detail_submission
      if (resDetailContest.status == 200) {
        dispatch({ type: "GET_DETAIL_CONTEST", payload: dataDetailContest });
        // dispatch({ type: "LOADING" });
        console.log("data detailsss1", dataDetailContest);
        console.log("data submission1");
        console.log(
          "data my contest detail1",
          resDetailContest.data.results.id
        );
      }
    } catch (error) {
      console.log(error, "error line 131");
    }
  };
};

// export const getDetailContestWithToken = (idContest, token) => {
//     return async dispatch => {
//         try {
//             const resDetailContest = await Axios.get(`${BASE_URL}/api/v1/contest/detail/${idContest}?limit=10&page=1`,  {
//                 headers: {
//                     Authorization: token
//                 }
//             })
//             const dataDetailContest = resDetailContest.data.data
//             const submission = resDetailContest.data.data.detail_submission
//             if (resDetailContest.status == 200) {
//                 dispatch({ type: "GET_DETAIL_CONTEST", payload: dataDetailContest, submission: submission })
//                 dispatch({ type: "LOADING" })
//                 console.log("data detailsss", dataDetailContest)
//                 console.log("data submission", submission)
//                 console.log("data my contest detail", resDetailContest.data.data)

//             }

//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export const getMyContest = (token) => {
  return async (dispatch) => {
    try {
      const resMyContest = await Axios.get(
        `${NEW_URL}/contest/mycontest?page=2`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const dataMyContest = resMyContest.data.result.status;
      if (resMyContest.message == 200 && dataMyContest !== "no contest yet") {
        dispatch({ type: "GET_MYCONTEST", payload: dataMyContest });
        console.log("data my contest", dataMyContest);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendSubmission = (
  idContest,
  token,
  title,
  desc,
  photo,
  photoName,
  photoType,
  photo1,
  photoName1,
  photoType1,
  photo2,
  photoName2,
  photoType2
) => {
  const dataForm = new FormData();
  dataForm.append("image", {
    uri: photo,
    name: photoName,
    type: photoType,
  });
  dataForm.append("image", {
    uri: photo1,
    name: photoName1,
    type: photoType1,
  });
  dataForm.append("image", {
    uri: photo2,
    name: photoName2,
    type: photoType2,
  });
  dataForm.append("title", title);
  dataForm.append("description", desc);
  return async (dispatch) => {
    try {
      const res = await Axios.post(
        `${BASE_URL}/api/v1/submission/${idContest}`,
        dataForm,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status == 201) {
        console.log("Hasil kirim gambarrrr", res);
        dispatch({
          type: "TOAST",
          toastMessage: "Your work has been submitted",
        });

        const resContest = await Axios.get(
          `${BASE_URL}/api/v1/contest?limit=10&page=1`
        );
        const dataContest = resContest.data.data.rows;

        if (resContest.status == 200) {
          dispatch({ type: "GET_ALL_CONTEST", allContest: dataContest });
          console.log("data Router", dataContest);
        }
        const resDetailContest = await Axios.get(
          `${BASE_URL}/api/v1/contest/detail/${idContest}?limit=10&page=1`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const dataDetailContest = resDetailContest.data.data;
        const submission = resDetailContest.data.data.detail_submission;
        if (resDetailContest.status == 200) {
          dispatch({
            type: "GET_DETAIL_CONTEST",
            payload: dataDetailContest,
            submission: submission,
          });
        }
        const resMyContest = await Axios.get(
          `${BASE_URL}/api/v1/contest/mine`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const dataMyContest = resMyContest.data.data.rows;
        if (resMyContest.status == 200 && dataMyContest !== "no contest yet") {
          dispatch({ type: "GET_MYCONTEST", payload: dataMyContest });
          console.log("data my contest", dataMyContest);
        } else dispatch({ type: "GET_MYCONTEST", payload: [] });
        dispatch({ type: "LOADING" });
      } else {
        dispatch({ type: "LOADING" });
        dispatch({
          type: "TOAST",
          toastMessage: "Failed, you should upload 3 image, try again!",
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING" });
      dispatch({
        type: "TOAST",
        toastMessage: "Failed, you should upload 3 image, try again!",
      });
    }
  };
};

export const getSubmissions = () => {
  return async (dispatch) => {
    try {
      const resSubmission = await Axios.get(
        `${NEW_URL}/contest/submission/1?page=1`
      );
      const dataSubmission = resSubmission.data.result;

      if (resSubmission.status == 200 && dataSubmission !== NULL) {
        dispatch({ type: "GET_SUBMISSION", submission: submission });
        // console.log("data Router search", dataContest)
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOADING" });
      dispatch({
        type: "TOAST",
        toastMessage: "Failed, you should upload 3 image, try again!",
      });
    }
  };
};
