import axios from "axios";
import { Freight } from "../types";

export async function getFreights(): Promise<Freight[]> {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/freights");
    console.log('...getting')
    return res.data;
}

export async function updateFreight(freight: Freight): Promise<boolean> {
    const res = await axios.put(import.meta.env.VITE_BACKEND_URL + "/freights/"+ freight.id, freight);
    return res.status == 200;
}

export async function createFreight(freight: Freight): Promise<boolean> {
    const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/freights", freight);
    return res.status == 201;
}

export async function deleteFreight(id: number): Promise<boolean> {
    const res = await axios.delete(import.meta.env.VITE_BACKEND_URL + "/freights/" + id);
    return res.status == 200;
}