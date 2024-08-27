export interface Vehicle {
    plate: string,
    name: string,
    type: "Caminhonete" | "Furgão" | "Caminhão",
    weight?: number
}
export interface Freight {
    id?: number,
    product_name?: string,
    price?: number | string,
    rate?: number | string,
    driver_id?: number,
    vehicle?: Vehicle,
    vehicle_plate?: string,
    distance?: number,
    open?: boolean,
    closed_at?: Date,
    created_at?: Date,
    updated_at?: Date,
}