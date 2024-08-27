import { IUser} from "../types";
import axios, { AxiosError } from "axios";
import getCookie from "../utils/getCookie";

export async function getUsers(): Promise<IUser[]> {
  try {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/users", {
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

export async function updateUser(user: IUser, id: number): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.put(import.meta.env.VITE_BACKEND_URL + "/users/" + id, user, {
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

export async function createUser(user: IUser): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.post(import.meta.env.VITE_BACKEND_URL + "/users", user, {
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

export async function deleteUser(id: number): Promise<{ success: boolean, error?: string }> {
  try {
    await axios.delete(import.meta.env.VITE_BACKEND_URL + "/users/" + id, {
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
