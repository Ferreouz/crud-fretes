import {Freight} from "../types"
export async function getFreights(): Promise<Freight[]> {
    return [
        {
            id: 1,
            productName: "Mesa",
            price: 100,
            rate: 20,
            driver_id: 1,
            vehicle: {
                plate: "XXX-11",
                name: "Optimus",
                type: "Furgão"
            },
            distance: 10,
            opened: true,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 2,
            productName: "Caneta",
            price: 10,
            rate: 2,
            driver_id: 1,
            vehicle: {
                plate: "XXX-12",
                name: "Optimus Prime",
                type: "Furgão"
            },
            distance: 10,
            opened: false,
            created_at: new Date(),
            updated_at: new Date()
        },
    ]
}