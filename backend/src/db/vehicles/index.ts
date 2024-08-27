import pool from "../pool";
import { IVehicle, IVehicleType,isVehicleModifiableKey } from "./types";

async function getAllVehicles(): Promise<Array<IVehicle>> {
    const res = await pool.query('Select * from "Vehicles" order by updated_at DESC');
    return res.rows;
}

async function getTypes(): Promise<Array<IVehicleType>> {
    const res = await pool.query('Select * from "VehicleTypes"');
    return res.rows;
}
async function insertVehicle(vehicle: IVehicle):Promise<number> {
    const keys = Object.keys(vehicle);
    let query = "(";
    let values = "VALUES (";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isVehicleModifiableKey(key) && vehicle[key]){
            query += `${index > 1 ? "," : ""}${key}`;
            values += `${index > 1 ? "," : ""}$${index}`;
            args.push(vehicle[key]);
            index ++;
        }
    }
    if(query == "(" || !args){
        throw new Error("No insert fields provided");
    }
    query += ")";
    values += ")";
    query = 'INSERT INTO "Vehicles" ' + query  + " " + values;
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function updateVehicle(plate: string, vehicle: IVehicle):Promise<number> {
    const keys = Object.keys(vehicle);
    let query = "";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isVehicleModifiableKey(key) && vehicle[key]){
            query += `${index > 1 ? "," : ""}${key} = $${index}`;
            args.push(vehicle[key]);
            index ++;
        }
    }
    if(query == "" || !args){
        throw new Error("No update fields provided");
    }
    query = 'UPDATE "Vehicles" SET ' + query + `, updated_at = now() WHERE plate = $${index}`;
    args.push(plate);
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function deleteVehicle(plate: string): Promise<number> {
    const res = await pool.query('DELETE FROM "Vehicles" WHERE plate = $1', [plate]);
    return res.rowCount;
}

const vehicles = {
    getAll: getAllVehicles,
    update: updateVehicle,
    delete: deleteVehicle,
    insert: insertVehicle,
    types: {
        getAll: getTypes,
    }
}
export default vehicles;