import { IUser } from "../db/users/types";

export function validateFormNewUser(user: IUser): {valid: boolean, error?: string} {
    let valid = true;
    let error = "";
    if(user.name.length < 3) {
        valid = false;
        error = "Digite um nome com pelo menos 3 characteres";
    } else if(!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        valid = false;
        error = "Digite um email valido";      
    } else if(user.password.length < 8) {
        valid = false;
        error = "Digite uma senha com pelo menos 8 characteres";  
    }

    return {valid, error}
}