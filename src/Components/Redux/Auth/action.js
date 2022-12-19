export const AUTH_USER = "AUTH_USER";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const UPLOAD_PIC = "UPLOAD_PIC";

export const actionPic = (payload) => ({ type: UPLOAD_PIC, payload });
export const authUser = (payload) => ({ type: AUTH_USER, payload });
export const authLoading = (payload) => ({ type: AUTH_LOADING, payload });
export const authError = (payload) => ({ type: AUTH_ERROR, payload });
export const authLogout = () => ({ type: LOGOUT, payload: {} });

export const authRegister = (res) => async (dispatch) => {
  dispatch(authLoading(true));
  try {
    localStorage.setItem("userInfo", JSON.stringify(res));
    localStorage.setItem("userId", res?.user?._id);
    dispatch(authUser(res));
  } catch (err) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(err.message);
  }
};

export const uploadPic = (pic) => async (dispatch) => {
  dispatch(authLoading(true));
  try {
    const url = `https://api.cloudinary.com/v1_1/yasherosion/image/upload`;
    const profile = new FormData();
    profile.append("file", pic);
    profile.append("upload_preset", "chat-app");
    profile.append("cloud_name", "yasherosion");
    let res = await fetch(url, {
      method: "POST",
      body: profile,
    });
    let data = await res.json();
    console.log(data);
    dispatch(actionPic(data.secure_url));
  } catch (error) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(error.message);
  }
};

export const logout = () => async (dispatch) => {
  dispatch(authLoading(true));
  try {
    localStorage.removeItem("userInfo");
    dispatch(logout());
  } catch (err) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(err.message);
  }
}