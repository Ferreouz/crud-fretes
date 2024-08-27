import pool from "../pool";
import { IUser } from "./types";

async function getAllUsers(): Promise<Array<IUser>> {
    const res = await pool.query('Select id, name, type, email from "Users"');
    return res.rows;
}

async function getUser(email: string): Promise<IUser> {
    const res = await pool.query('Select * from "Users" WHERE email = $1', [email]);
    return res.rows.length > 0 ? res.rows[0] : null;
}

async function create(user: IUser): Promise<IUser> {
    const res = await pool.query('INSERT INTO "Users" ("name", "email", "password", "type") VALUES ($1, $2, $3, $4)', 
        [
            user.name,
            user.email,
            user.password,
            user.type
        ]);
    return res.rows.length > 0 ? res.rows[0] : null;
}

const users = {
    getAll: getAllUsers,
    get: getUser,
    create,
}
export default users;