import { IFreight } from '../../types';

export interface PropsModalFreight {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addFreight: (Freight: IFreight) => void,
    editFreight: (Freight: IFreight) => void,
    freight?: IFreight
}
