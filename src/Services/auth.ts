import { api } from "../Utils/api";


export const login = async (
    user_email: string,
    password: string,
) => {
    const params = {
        email: user_email,
        password: password
    }
    try {
        const res = await api.post(`/auth/login`, params)
        return {
            statusCode: 200,
            data: res.data
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: "login failure"
        }
    }
};

export const register = async (params: any) => {
    try {
        const res = await api.post(`/auth/register`, params);
        return {
            statusCode: 200,
            data: res.data
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: "exist an error"
        }
    }
}

export const updateUser = async (userId: string, params: any) => {
    try {
        const res = await api.patch(`/users/${userId}`, params);
        return {
            statusCode: 200,
            data: res?.data
        }
    } catch (error) {
        return {
            satusCode: 500,
            message: "exist an error"
        }
    }
}