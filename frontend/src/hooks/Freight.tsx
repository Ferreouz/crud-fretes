import axios, { AxiosError } from "axios";
import { IFreight } from "../types";
import getCookie from "../utils/getCookie";

export async function getFreights(): Promise<IFreight[]> {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/freights", {
        headers: {
            Authorization: `Bearer ${getCookie("_auth")}`
        }
    });
    return res.data;
}

export async function updateFreight(freight: IFreight): Promise<{ success: boolean, error?: string }> {
    try {
        await axios.put(import.meta.env.VITE_BACKEND_URL + "/freights/" + freight.id, freight, {
            headers: {
                Authorization: `Bearer ${getCookie("_auth")}`
            }
        });
        return { success: true };
    } catch (e) {
        if (e instanceof AxiosError) {
            return { success: false, error: e?.response?.data?.error }
        }
    }
    return { success: false }
}

export async function createFreight(freight: IFreight): Promise<{ success: boolean, error?: string }> {
    try {
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/freights", freight, {
            headers: {
                Authorization: `Bearer ${getCookie("_auth")}`
            }
        });
        return { success: true };
    } catch (e) {
        if (e instanceof AxiosError) {
            return { success: false, error: e?.response?.data?.error }
        }
    }
    return { success: false }
}

export async function deleteFreight(id: number): Promise<{ success: boolean, error?: string }> {
    try {
        await axios.delete(import.meta.env.VITE_BACKEND_URL + "/freights/" + id, {
            headers: {
                Authorization: `Bearer ${getCookie("_auth")}`
            }
        });
        return { success: true };
    } catch (e) {
        if (e instanceof AxiosError) {
            return { success: false, error: e?.response?.data?.error }
        }
    }
    return { success: false }
}