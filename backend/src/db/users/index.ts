import pool from "../pool";
import { IUser, isUserModifiableKey } from "./types";

// Login Route
async function getUser(email: string): Promise<IUser> {
    const res = await pool.query('Select * from "Users" WHERE email = $1', [email]);
    return res.rows.length > 0 ? res.rows[0] : null;
}

// Signup Route
async function create(user: IUser): Promise<IUser> {
    console.log(user)
    const res = await pool.query(`INSERT INTO "Users" ("name", "type", "email", "password") VALUES ($1, $2, $3, $4)`, 
        [
            user.name,
            user.type,
            user.email,
            user.password,
        ]);
    return res.rows.length > 0 ? res.rows[0] : null;
}

// CRUD
async function getAllUsers(): Promise<Array<IUser>> {
    const res = await pool.query(`Select id, name, type, email, active from "Users" where type != 'admin' order by updated_at DESC`);
    return res.rows;
}

async function update(id: number, user: IUser):Promise<number> {
    delete user.id;
    const keys = Object.keys(user);
    let query = "";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isUserModifiableKey(key) && user[key]){
            query += `${index > 1 ? "," : ""}${key} = $${index}`;
            args.push(user[key]);
            index ++;
        }
    }
    if(query == "" || !args){
        throw new Error("No update fields provided");
    }
    query = 'UPDATE "Users" SET ' + query + `, updated_at = now() WHERE id = $${index} and type != 'admin'`;
    args.push(id);
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function insert(user: IUser):Promise<number> {
    delete user.id;
    const keys = Object.keys(user);
    let query = "(";
    let values = "VALUES (";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isUserModifiableKey(key) && user[key]){
            query += `${index > 1 ? "," : ""}${key}`;
            values += `${index > 1 ? "," : ""}$${index}`;
            args.push(user[key]);
            index ++;
        }
    }
    if(query == "(" || !args){
        throw new Error("No insert fields provided");
    }
    query += ',"type")';
    values += ",'driver')";
    query = 'INSERT INTO "Users" ' + query  + " " + values;
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function deleteUser(id: number): Promise<number> {
    const res = await pool.query(`UPDATE "Users" SET active = false WHERE id = $1 AND type != 'admin'`, [id]);
    return res.rowCount;
}

const users = {
    getAll: getAllUsers,
    get: getUser,
    create,
    insert,
    update,
    delete: deleteUser,
}
export default users;