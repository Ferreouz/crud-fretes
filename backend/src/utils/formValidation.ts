import { IUser } from "../db/users/types";
import { IFreight } from "../db/freights/types";
import { IVehicle, IVehicleType } from "../db/vehicles/types";

export function validateFormNewUser(user: IUser): { valid: boolean, error?: string } {
    let valid = true;
    let error = "";
    if (user.name.length < 3) {
        valid = false;
        error = "Digite um nome com pelo menos 3 characteres";
    } else if (!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        valid = false;
        error = "Digite um email valido";
    } else if (user.password.length < 8) {
        valid = false;
        error = "Digite uma senha com pelo menos 8 characteres";
    }

    return { valid, error }
}

export function validateFormNewFreight(freight: IFreight): { valid: boolean, error?: string } {
    let valid = true;
    let error = "";
    if (freight.product_name.length < 3) {
        valid = false;
        error = "Digite um nome com pelo menos 3 characteres";
    } else if (isNaN(freight.distance) || freight.distance < 1) {
        valid = false;
        error = "Digite uma distancia de pelo menos 1KM";
    }

    return { valid, error }
}

export function validateFormNewVehicle(vehicle: IVehicle): { valid: boolean, error?: string } {
    let valid = true;
    let error = "";
    if (vehicle.name.length < 3) {
        valid = false;
        error = "Digite um nome com pelo menos 3 characteres";
    } else if (!vehicle.plate.match(/([a-zA-Z0-9]{3})-([a-zA-Z0-9]{4})/)) {
        valid = false;
        error = "Digite uma placa válida. Exemplo: XXX-1234";
    }

    return { valid, error }
}

export function validateFormNewVehicleType(vehicle: IVehicleType): { valid: boolean, error?: string } {
    let valid = true;
    let error = "";
    if (vehicle.name.length < 3) {
        valid = false;
        error = "Digite um nome com pelo menos 3 characteres";
    } else if (isNaN(vehicle.weight) || vehicle.weight < 1) {
        valid = false;
        error = "Digite um peso maior que 0";
    }

    return { valid, error }
}