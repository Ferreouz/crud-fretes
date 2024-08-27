export interface IUser {
    id: number,
    name: string,
    type: string,
    email: string,
    password: string,
    active?: boolean,
    created_at: string,
    updated_at: string,
}
type UserKey = keyof IUser;
export function isUserModifiableKey(key: string): key is UserKey {
    return [
       "name", "email", "password"
    ].includes(key);
}


