import { IUser } from "../users/types";
import { IVehicleWithWeight } from "../vehicles/types";

export type DriverRequestStatus =  "waiting"| "denied" | "accepted"
export type FreightStatus =  "Aceito"| "Rota de entrega" | "Finalizado"
export interface IFreight {
    id: number,
    product_name: string,
    driver_id?: number,
    vehicle_plate: string,
    distance: number,
    created_at: string,
    updated_at: string,
    status?: FreightStatus,
    delivered_at?: string,
    /**
    * All Calculated at runtime (not part of DB table)
    */ 
    price?: number | string,
    rate?: number | string,
    driver_receives?: string,
    drivers_requests?: IFreightRequest[],
    driver_requested_at?: string,
    driver_requested_status?: DriverRequestStatus,
}

export interface IFreightRequest {
    driver_id: number,
    freight_id: number,
    status: DriverRequestStatus,
    created_at: string,
    updated_at: string,
    /**
    * All Calculated at runtime (not part of DB table)
    */
    driver?: IUser,
}


export interface IFreightWithVehicle extends IFreight {
    vehicle: IVehicleWithWeight
}

type FreightModifiableKeys = keyof IFreight;
export function isFreightModifiableKey(key: string): key is FreightModifiableKeys {
    return [
        "product_name", "vehicle_plate", "distance"
    ].includes(key);
}


