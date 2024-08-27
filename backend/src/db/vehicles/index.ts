import pool from "../pool";
import { IVehicle, IVehicleType,isVehicleModifiableKey, isVehicleTypeModifiableKey } from "./types";

async function getAllVehicles(): Promise<Array<IVehicle>> {
    const res = await pool.query('Select * from "Vehicles" order by updated_at DESC');
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

async function getTypes(): Promise<Array<IVehicleType>> {
    const res = await pool.query('Select * from "VehicleTypes" order by updated_at DESC');
    return res.rows;
}

async function insertVehicleType(vehicle: IVehicleType):Promise<number> {
    const keys = Object.keys(vehicle);
    let query = "(";
    let values = "VALUES (";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isVehicleTypeModifiableKey(key) && vehicle[key]){
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
    query = 'INSERT INTO "VehicleTypes" ' + query  + " " + values;
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function updateVehicleType(name: string, vehicle: IVehicleType):Promise<number> {
    const keys = Object.keys(vehicle);
    let query = "";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isVehicleTypeModifiableKey(key) && vehicle[key]){
            query += `${index > 1 ? "," : ""}${key} = $${index}`;
            args.push(vehicle[key]);
            index ++;
        }
    }
    if(query == "" || !args){
        throw new Error("No update fields provided");
    }
    query = 'UPDATE "VehicleTypes" SET ' + query + `, updated_at = now() WHERE name = $${index}`;
    args.push(name);
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function deleteVehicleType(name: string): Promise<number> {
    const res = await pool.query('DELETE FROM "VehicleTypes" WHERE name = $1', [name]);
    return res.rowCount;
}

const vehicles = {
    getAll: getAllVehicles,
    update: updateVehicle,
    delete: deleteVehicle,
    insert: insertVehicle,
    types: {
        getAll: getTypes,
        update: updateVehicleType,
        insert: insertVehicleType,
        delete: deleteVehicleType,
    }
}
export default vehicles;