export interface IVehicle {
    plate: string,
    name: string,
    type: string,
}
export interface IVehicleType {
    name: string,
    weight: number,
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

