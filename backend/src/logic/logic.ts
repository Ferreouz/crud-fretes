import { FreightPriceRate } from "./types";

export function calculateFreightPrice(distance: number, vehicleWeight: number): FreightPriceRate {
    const price = distance * vehicleWeight;

    let tax = 0;
    if(distance > 500) {
        tax = 0.75;
    }else if(distance > 200) {
        tax = 0.1;
    }else if(distance > 100) {
        tax = 0.15;
    }else {
        tax = 0.2;
    } 
    return {
        price,
        rate: price * tax
    };
}