import axios from "axios";
import getCookie from "../utils/getCookie";
import { IUser } from "../types";

export async function getLoginStatus(): Promise<IUser | undefined> {
    try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/auth/check", {
            headers: {
                Authorization: `Bearer ${getCookie("_auth")}`
            }
        });
        return res.data;
    } catch (e) {
        console.log(e)
    }
    return undefined;
}
