export interface Vehicle {
    plate: string,
    name: string,
    type: "Caminhonete" | "Furgão" | "Caminhão",
}
export interface Freight {
    id?: number,
    productName?: string,
    price?: number,
    rate?: number,
    driver_id?: number,
    vehicle?: Vehicle,
    distance?: number,
    opened?: boolean,
    closed_at?: Date,
    created_at?: Date,
    updated_at?: Date,
}