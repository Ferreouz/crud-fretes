import { Vehicle } from '../../types';

export interface PropsModalVehicle {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addVehicle: (Freight: Vehicle) => void,
    editVehicle: (Freight: Vehicle, oldPlate: string) => void,
    vehicle?: Vehicle
}
