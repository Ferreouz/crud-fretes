import pool from "../pool";
import { IFreight, IFreightWithVehicle, isFreightModifiableKey, DriverRequestStatus } from "./types";

async function getAllFreights(): Promise<Array<IFreight>> {
    const res = await pool.query('Select * from "Freights" order by updated_at desc');
    return res.rows;
}

async function getFreightWithVehicle(id: number): Promise<IFreightWithVehicle> {
    const res = await pool.query(`
    Select  f.*, jsonb_build_object(
        'plate', v.plate,
        'name', v.name,
        'type', v.type,
        'weight', t.weight
    ) as vehicle 
    from "Freights" f 
    INNER JOIN "Vehicles" as v ON f.vehicle_plate = v.plate 
    INNER JOIN "VehicleTypes" as t ON v.type = t.name
    WHERE f.id = $1`, [id]);
    return res.rows.length > 0 ? res.rows[0] : null;
}

async function getAllFreightsWithVehicle(): Promise<Array<IFreightWithVehicle>> {
    const res = await pool.query(`
    WITH
    drivers_requests AS (
        SELECT r.*,
           jsonb_build_object(
            'email', d.email,
            'name', d.name,
            'id', d.id
            ) as driver
        FROM "FreightDriverRequests" r
        INNER JOIN "Users" d 
        ON r.driver_id = d.id 
        WHERE d.active = true
    )
    Select f.*, 
        jsonb_build_object(
            'plate', v.plate,
            'name', v.name,
            'type', v.type,
            'weight', t.weight
        ) as vehicle,
        json_agg(dr) as drivers_requests 
    FROM "Freights" as f 
        LEFT  JOIN drivers_requests dr
        ON dr.freight_id = f.id
        INNER JOIN "Vehicles" as v ON f.vehicle_plate = v.plate 
        INNER JOIN "VehicleTypes" as t ON v.type = t.name
        GROUP BY f.id, v.plate, t.weight
        order by f.updated_at desc
    `);
    return res.rows;
}

async function getAllForDrivers(driver_id: number): Promise<Array<IFreightWithVehicle>> {
    const res = await pool.query(`
Select f.*, jsonb_build_object(
    'plate', v.plate,
    'name', v.name,
    'type', v.type,
    'weight', t.weight
    ) as vehicle,
    (SELECT updated_at FROM "FreightDriverRequests" as req WHERE req.driver_id = $1 AND freight_id = f.id) as driver_requested_at,
    (SELECT status FROM "FreightDriverRequests" as req WHERE req.driver_id = $1 AND freight_id = f.id) as driver_requested_status
    FROM "Freights" as f 
        INNER JOIN "Vehicles" as v ON f.vehicle_plate = v.plate 
        INNER JOIN "VehicleTypes" as t ON v.type = t.name
        WHERE f.driver_id = $1 
        OR (SELECT 1 FROM "FreightDriverRequests" as req WHERE req.driver_id = $1 AND freight_id = f.id) IS NOT NULL
        OR f.driver_id IS NULL
        order by f.updated_at desc;
    `, [driver_id]);
    return res.rows;
}
// 
async function update(id: number, freight: IFreight): Promise<number> {
    delete freight.id;
    const keys = Object.keys(freight);
    let query = "";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (isFreightModifiableKey(key) && freight[key]) {
            query += `${index > 1 ? "," : ""}${key} = $${index}`;
            args.push(freight[key]);
            index++;
        }
    }
    if (query == "" || !args) {
        throw new Error("No update fields provided");
    }
    query = 'UPDATE "Freights" SET ' + query + `, updated_at = now() WHERE id = $${index} AND driver_id IS NULL`;
    args.push(id);
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function insert(freight: IFreight): Promise<number> {
    delete freight.id;
    const keys = Object.keys(freight);
    let query = "(";
    let values = "VALUES (";
    let index = 1;
    const args = [];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (isFreightModifiableKey(key) && freight[key]) {
            query += `${index > 1 ? "," : ""}${key}`;
            values += `${index > 1 ? "," : ""}$${index}`;
            args.push(freight[key]);
            index++;
        }
    }
    if (query == "(" || !args) {
        throw new Error("No insert fields provided");
    }
    query += ")";
    values += ")";
    query = 'INSERT INTO "Freights" ' + query + " " + values;
    const res = await pool.query(query, args);
    return res.rowCount;
}

async function deleteF(id: number): Promise<number> {
    const res = await pool.query('DELETE FROM "Freights" WHERE id = $1', [id]);
    return res.rowCount;
}

// has a bug: if from api a driver tries to request a frontend non appearing freight he is able to, has no effect on the logic tho. #TODO 
async function driverRequest(freight_id: number, driver_id: number): Promise<number> {
    const res = await pool.query('INSERT INTO "FreightDriverRequests" ("driver_id", "freight_id") VALUES ($1, $2)', [driver_id, freight_id]);
    return res.rowCount;
}

// has a bug: if from api a admin can deny a driver's request even if its ongoing with another, has no effect on the logic tho. #TODO 
async function adminUpdateFreightRequest(freight_id: number, driver_id: number, new_status: DriverRequestStatus, price?: number, rate?: number): Promise<number> {
    if (new_status == "accepted") {
        const res2 = await pool.query(
            `UPDATE "Freights" SET driver_id = $1, price = $2, rate = $3, status = 'Aceito', updated_at = now() WHERE id = $4`,
            [driver_id, price, rate, freight_id]);
        await pool.query(`UPDATE "FreightDriverRequests" SET status = 'denied', updated_at = now() WHERE freight_id = $1 AND driver_id != $2`, [freight_id, driver_id]);
    }
    const res = await pool.query(`UPDATE "FreightDriverRequests" SET status = $1, updated_at = now() WHERE driver_id = $2 AND freight_id = $3 AND status != 'accepted'`, [new_status, driver_id, freight_id]);
    return res.rowCount;
}

const freights = {
    getAll: getAllFreights,
    getAllWithVehicle: getAllFreightsWithVehicle,
    update: update,
    insert: insert,
    delete: deleteF,
    getAllForDrivers,
    driverRequest,
    adminUpdateFreightRequest,
    getWithVehicle: getFreightWithVehicle,
}
export default freights;