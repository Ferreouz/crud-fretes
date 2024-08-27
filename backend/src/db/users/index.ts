import pool from "../pool";
import { IUser } from "./types";

async function getAllUsers(): Promise<Array<IUser>> {
    const res = await pool.query('Select id, name, type, email from "Users"');
    return res.rows;
}

const users = {
    getAll: getAllUsers
}
export default users;