import { IUser } from "../db/users/types";

export default function isAdmin(user: IUser): boolean {
    return user.type == "admin";
}