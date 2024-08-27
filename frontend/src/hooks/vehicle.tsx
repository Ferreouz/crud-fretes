import { Vehicle } from "../types";
import axios from "axios";
import getCookie from "../utils/getCookie";

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/vehicles",{
    headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
    }
});
  return res.data;
}