import pool from "../pool";
import { IFreight, IFreightWithVehicle, isFreightModifiableKey } from "./types";

async function getAllFreights():Promise<Array<IFreight>> {
    const res = await pool.query('Select * from "Freights" order by updated_at desc');
    return res.rows;
}

async function getAllFreightsWithVehicle():Promise<Array<IFreightWithVehicle>> {
    const res = await pool.query(`
    Select f.*, jsonb_build_object(
    'plate', v.plate,
    'name', v.name,
    'type', v.type,
    'weight', t.weight
    ) as vehicle FROM "Freights" as f 
        INNER JOIN "Vehicles" as v ON f.vehicle_plate = v.plate 
        INNER JOIN "VehicleTypes" as t ON v.type = t.name
        order by f.updated_at desc    
    `);
    return res.rows;
}

async function getAllForDrivers(driver_id: number):Promise<Array<IFreightWithVehicle>> {
    const res = await pool.query(`
    Select f.*, jsonb_build_object(
    'plate', v.plate,
    'name', v.name,
    'type', v.type,
    'weight', t.weight
    ) as vehicle FROM "Freights" as f 
        INNER JOIN "Vehicles" as v ON f.vehicle_plate = v.plate 
        INNER JOIN "VehicleTypes" as t ON v.type = t.name
        WHERE driver_id = $1 OR open = true
        order by f.updated_at desc    
    `, [driver_id]);
    return res.rows;
}
async function update(id: number, freight: IFreight):Promise<number> {
    delete freight.id;
    const keys = Object.keys(freight);
    let query = "";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isFreightModifiableKey(key) && freight[key]){
            query += `${index > 1 ? "," : ""}${key} = $${index}`;
            args.push(freight[key]);
            index ++;
        }
    }
    if(query == "" || !args){
        throw new Error("No update fields provided");
    }
    query = 'UPDATE "Freights" SET ' + query + `, updated_at = now() WHERE id = $${index}`;
    args.push(id);
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function insert(freight: IFreight):Promise<number> {
    delete freight.id;
    const keys = Object.keys(freight);
    let query = "(";
    let values = "VALUES (";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(isFreightModifiableKey(key) && freight[key]){
            query += `${index > 1 ? "," : ""}${key}`;
            values += `${index > 1 ? "," : ""}$${index}`;
            args.push(freight[key]);
            index ++;
        }
    }
    if(query == "(" || !args){
        throw new Error("No insert fields provided");
    }
    query += ")";
    values += ")";
    query = 'INSERT INTO "Freights" ' + query  + " " + values;
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function deleteF(id: number): Promise<number> {
    const res = await pool.query('DELETE FROM "Freights" WHERE id = $1', [id]);
    return res.rowCount;
}


const freights = {
    getAll: getAllFreights,
    getAllWithVehicle: getAllFreightsWithVehicle,
    update: update,
    insert: insert,
    delete: deleteF,
    getAllForDrivers,
}
export default freights;