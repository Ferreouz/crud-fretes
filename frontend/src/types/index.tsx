export interface IVehicle {
    plate: string,
    name: string,
    type: string,
    weight?: number,
    created_at?: Date,
    updated_at?: Date,
}
export interface IFreight {
    id?: number,
    product_name?: string,
    price?: number | string,
    rate?: number | string,
    driver_id?: number,
    vehicle?: IVehicle,
    vehicle_plate?: string,
    distance?: number,
    open?: boolean,
    closed_at?: Date,
    created_at?: Date,
    updated_at?: Date,
}
export interface IVehicleType {
    name: string,
    weight?: number,
    created_at?: Date,
    updated_at?: Date,
}

export interface IUser {
    id: number,
    name?: string,
    email?: string,
    freightCount?: number,
    active?: boolean,
    created_at?: Date,
    updated_at?: Date,
    password?: string,
}