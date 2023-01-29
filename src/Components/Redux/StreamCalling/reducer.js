import { SET_USER_VIDEO, SET_PARTNER_VIDEO } from "./action";

const initState = {
    partnerVideo: null,
    userVideo: null
};
export const serachReducer = (store = initState, { type, payload }) => {
    switch (type) {
        case SET_USER_VIDEO:
            return {
                ...store,
                userVideo: payload,
            };
        case SET_PARTNER_VIDEO:
            return {
                ...store,
                partnerVideo: payload
            };
        default:
            return store;
    }
};
