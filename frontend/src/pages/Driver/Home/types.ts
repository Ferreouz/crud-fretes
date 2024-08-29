import { FreightStatus, IFreight } from "../../../types";
export interface ModalChangeStatusProps { opened: boolean, onSubmit: (freightId: number, newStatus: FreightStatus) => void, closeModal: () => void, freight: IFreight }
