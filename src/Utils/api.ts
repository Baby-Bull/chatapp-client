import axios from "axios";
import { getTokenFromCookie } from "./storage";

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }
})

export const setApi = (token: string) => {
    if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    else {
        api.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzN2M0NWNkOTNiN2YxM2RjYzliYTdiYyIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJ1c2VybmFtZSI6InVzZXIxIiwiZW1haWwiOiJlbWFpbDEiLCJjcmVhdGVkQXQiOiIyMDIyLTExLTIyVDAzOjQ1OjE3LjA0OVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTExLTIyVDAzOjQ1OjE3LjA0OVoiLCJfX3YiOjB9LCJleHBpcmVzIjo2MDAwMDAwLCJfdHlwZSI6ImFjY2VzcyIsImlhdCI6MTY3MDkwMzE0MX0.YPrCcdAwt5bNmg3_2Ab1XULZuKmmXzkV02gmAPCo_UU`;
    }
};

setApi(getTokenFromCookie("user_token"));
