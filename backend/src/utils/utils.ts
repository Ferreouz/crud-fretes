import { FreightPriceRate } from "./types";

export function calculateFreightPrice(distance: number, vehicleWeight: number): FreightPriceRate {
    const price = distance * vehicleWeight;

    let tax = 0;
    if(distance > 500) {
        tax = 0.075;
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

export function formatMoney(int: number | undefined): string | undefined {
    if (!int || !(int > 0)) {
        return undefined;
    }
    let out = int.toString();
    if(!out.includes('.')){
        return out + ",00";
    }
    const [before, after] = out.split('.');
    return before + "," + (after.toString().length == 1 ? after + "0" : after)
}