import { IVehicleType } from '../../../types';

export interface PropsModalVehicleType {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addVehicle: (Freight: IVehicleType) => void,
    editVehicle: (Freight: IVehicleType, oldName: string) => void,
    vehicle?: IVehicleType
}
