export interface IVehicle {
    plate: string,
    name: string,
    type: "Caminhonete" | "Furgão" | "Caminhão",
}
export interface IVehicleType {
    name: "Caminhonete" | "Furgão" | "Caminhão",
    weight: number,
}
export interface IVehicleWithWeight extends IVehicle {
    weight: number
}