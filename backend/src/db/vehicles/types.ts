export interface IVehicle {
    plate: string,
    name: string,
    type: string,
    created_at: string,
    updated_at: string,
}
export interface IVehicleType {
    name: string,
    weight: number,
    created_at: string,
    updated_at: string,
}
export interface IVehicleWithWeight extends IVehicle {
    weight: number
}

type VehicleModifiableKeys = keyof IVehicle;
export function isVehicleModifiableKey(key: string): key is VehicleModifiableKeys {
    return [
       "plate", "name", "type"
    ].includes(key);
}

export function isVehicleTypeModifiableKey(key: string): key is VehicleModifiableKeys {
    return [
       "name", "weight"
    ].includes(key);
}

