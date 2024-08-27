import { IVehicle, IVehicleType } from "../types";
import axios, { AxiosError } from "axios";
import getCookie from "../utils/getCookie";

export async function getVehicles(): Promise<IVehicle[]> {
  try {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/vehicles", {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return res.data;
  } catch (e) {
    console.log(e)
  }
  return [];
}

export async function updateVehicle(vehicle: IVehicle, oldPlate: string): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.put(import.meta.env.VITE_BACKEND_URL + "/vehicles/" + oldPlate, vehicle, {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return { success: true };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { success: false, error: e?.response?.data?.error }
    }
    console.log(e)
  }
  return { success: false }
}

export async function createVehicle(vehicle: IVehicle): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/vehicles", vehicle, {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return { success: true };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { success: false, error: e?.response?.data?.error }
    }
    console.log(e)
  }
  return { success: false }
}

export async function deleteVehicle(plate: string): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.delete(import.meta.env.VITE_BACKEND_URL + "/vehicles/" + plate, {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return { success: true };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { success: false, error: e?.response?.data?.error }
    }
    console.log(e)
  }
  return { success: false }
}

export async function getVehicleTypes(): Promise<IVehicleType[]> {
  try {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/vehicleTypes", {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return res.data;
  } catch (e) {
    console.log(e)
  }
  return [];

}

export async function updateVehicleType(vehicle: IVehicleType, oldName: string): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.put(import.meta.env.VITE_BACKEND_URL + "/vehicleTypes/" + oldName, vehicle, {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return { success: true };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { success: false, error: e?.response?.data?.error }
    }
    console.log(e)
  }
  return { success: false }
}

export async function createVehicleType(vehicle: IVehicleType): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/vehicleTypes", vehicle, {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return { success: true };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { success: false, error: e?.response?.data?.error }
    }
    console.log(e)
  }
  return { success: false }
}

export async function deleteVehicleType(name: string): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.delete(import.meta.env.VITE_BACKEND_URL + "/vehicleTypes/" + name, {
      headers: {
        Authorization: `Bearer ${getCookie("_auth")}`
      }
    });
    return { success: true };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { success: false, error: e?.response?.data?.error }
    }
    console.log(e)
  }
  return { success: false }
}