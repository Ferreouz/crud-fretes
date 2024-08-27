import { IVehicleWithWeight } from "../vehicles/types";

export interface IFreight {
    id: number,
    product_name: string,
    /**
    * Calculated
    */
    price?: number,
    /**
    * Calculated
    */
    rate?: number,
    driver_id?: number,
    vehicle_plate: string,
    distance: number,
    open: boolean,
    closed_at?: string,
    created_at: string,
    updated_at: string,
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


