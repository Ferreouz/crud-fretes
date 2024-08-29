import { FreightStatus, IFreight } from "../../../types";
export interface ModalChangeStatusProps { opened: boolean, onSubmit: (newStatus: FreightStatus) => void, closeModal: () => void, freight: IFreight }
