import pool from "./pool"
import type {QueryResult} from "pg";
import users from "./users";
import freights from "./freights";
import vehicles from "./vehicles";

async function SelectQuery<T>(queryString: string): Promise<Array<QueryResult<T>>> {
    const res = await pool.query(queryString);
    return res.rows;
}
// insert/update/delete
async function ModifyQuery(queryString: string): Promise<QueryResult> {
    const res = await pool.query(queryString);
    return res;
}

const db = {
    SelectQuery,
    ModifyQuery,
    users,
    freights,
    vehicles
}

export default db;