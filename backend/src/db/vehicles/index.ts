import pool from "../pool";
import { IVehicle, IVehicleType } from "./types";

async function getAllVehicles(): Promise<Array<IVehicle>> {
    const res = await pool.query('Select * from "Vehicles"');
    return res.rows;
}

async function getWeights(): Promise<Array<IVehicleType>> {
    const res = await pool.query('Select * from "VehicleTypes"');
    return res.rows;
}

const vehicles = {
    getAll: getAllVehicles,
    types: {
        getAll: getWeights
    }
}
export default vehicles;