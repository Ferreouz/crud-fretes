import {Vehicle} from "../types"
export async function getVehicles(): Promise<Vehicle[]> {
    return [
        {
          plate: "XXX-JJJ",
          name: "Caminhao X",
          type: "Caminhão"
        },
        {
          plate: "XXX-123",
          name: "Optimus Prime",
          type: "Furgão"
        },
    ]
}