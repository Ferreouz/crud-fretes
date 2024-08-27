import { IVehicle } from '../../../types';

export interface PropsModalVehicle {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addVehicle: (Freight: IVehicle) => void,
    editVehicle: (Freight: IVehicle, oldPlate: string) => void,
    vehicle?: IVehicle
}
