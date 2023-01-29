export const SET_USER_VIDEO = "SET_USER_VIDEO";
export const SET_PARTNER_VIDEO = "SET_PARTNER_VIDEO";

export const setUserVideo = (payload) => ({ type: SET_USER_VIDEO, payload });
export const setPartnerVideo = (payload) => ({ type: SET_PARTNER_VIDEO, payload });

// export const makeSearchApi = (search) => async (dispatch) => {
//   searhcLoding(true);
//   const user = JSON.parse(localStorage.getItem("userInfo")) || {};
//   const url = `http://localhost:8000/auth?search=${search}`;
//   try {
//     let res = await fetch(url, {
//       method: "get",
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     let data = await res.json();
//     dispatch(searchResult(data));
//   } catch (err) {
//     dispatch(searchError(true));
//     console.log(err.message);
//   }
// };
