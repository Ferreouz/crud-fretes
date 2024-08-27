import { IUser } from '../../../types';

export interface PropsModalUser {
    opened: boolean,
    operation: "create" | "update",
    closeModal: () => void,
    addUser: (user: IUser) => void,
    editUser: (user: IUser, id: number) => void,
    user?: IUser
}
