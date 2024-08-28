import { DriverRequestStatus, IFreight, IFreightRequest } from '../../../types';

export interface PropsModalFreight {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addFreight: (Freight: IFreight) => void,
    editFreight: (Freight: IFreight) => void,
    freight?: IFreight
}


export interface PropsModalRequest {
    opened: boolean,
    closeModal: () => void,
    requests: IFreightRequest[],
    updateFreightRequest: (freight_id: number, driver_id: number, newStatus: DriverRequestStatus) => void,
}
