import { updateUser } from "../../../Services/auth";

export const AUTH_USER = "AUTH_USER";
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT = "LOGOUT";
export const UPLOAD_PIC = "UPLOAD_PIC";
export const UPDATE_USER = "UPDATE_USER";

export const actionPic = (payload) => ({ type: UPLOAD_PIC, payload });
export const actionUser = (payload) => ({ type: UPDATE_USER, payload });
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

export const uploadPic = (userId, picUrl) => async (dispatch) => {
  dispatch(authLoading(true));
  try {
    dispatch(actionPic(picUrl));
  } catch (error) {
    dispatch(authLoading(false));
    dispatch(authError(true));
    console.log(error.message);
  }
};

export const updateUserAction = (userId, payload) => async (dispatch) => {
  dispatch(authLoading(true));
  try {
    const result = await updateUser(userId, payload);
    dispatch(actionUser(payload));
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