import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "api-key": "1f62f832-199c-4198-bcf8-fa36b24e67ca",
    },
});
