import { Vehicle } from "../types";
import axios from "axios";

export async function getVehicles(): Promise<Vehicle[]> {
  const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/vehicles");
  return res.data;
}