import { Freight } from '../../types';

export interface PropsModalFreight {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addFreight: (Freight: Freight) => void,
    editFreight: (Freight: Freight) => void,
    freight?: Freight
}
