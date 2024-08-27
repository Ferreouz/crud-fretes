import axios from "axios";
import { Freight } from "../types";
import getCookie from "../utils/getCookie";

export async function getFreights(): Promise<Freight[]> {
    console.log(getCookie("_auth"))
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/freights", {
        headers: {
            Authorization: `Bearer ${getCookie("_auth")}`
        }
    });
    return res.data;
}

export async function updateFreight(freight: Freight): Promise<boolean> {
    const res = await axios.put(import.meta.env.VITE_BACKEND_URL + "/freights/"+ freight.id, freight, {
        headers: {
            Authorization: `Bearer ${getCookie("_auth")}`
        }
    });
    return res.status == 200;
}

export async function createFreight(freight: Freight): Promise<boolean> {
    const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/freights", freight, {
        headers: {
            Authorization: `Bearer ${getCookie("_auth")}`
        }
    });
    return res.status == 201;
}

export async function deleteFreight(id: number): Promise<boolean> {
    const res = await axios.delete(import.meta.env.VITE_BACKEND_URL + "/freights/" + id, {
        headers: {
            Authorization: `Bearer ${getCookie("_auth")}`
        }
    });
    return res.status == 200;
}