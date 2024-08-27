import { VehicleType } from '../../types';

export interface PropsModalVehicleType {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addVehicle: (Freight: VehicleType) => void,
    editVehicle: (Freight: VehicleType, oldName: string) => void,
    vehicle?: VehicleType
}
