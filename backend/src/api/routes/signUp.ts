import jwt from "jsonwebtoken";
import db from "../../db";
import bcrypt from "bcrypt";
import { IUser } from "../../db/users/types";
import { validateFormNewUser } from "../../utils/formValidation";

export default function route(app) {
    app.post("/auth/register", async (req, res) => {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                error: "Por favor, digite todos os campos",
            });
        }
        const user = { email, password, name, type: 'driver' } as IUser;
        const form = validateFormNewUser(user);
        if(!form.valid) {
            return res.status(400).json({
                error: form.error
            });
        }

        const hashedPass = bcrypt.hashSync(password, 10);
        try {
            user.password = hashedPass;
            await db.users.create(user);
            delete user.password;
            const access_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({
                access_token,
            });
        } catch (e) {
            console.log(e)
            if('code' in e && e.code == '23505') {
                return res.status(400).json({
                    error: "Já existe um usuario com este email, por favor digite outro"
                });
            }
            return res.status(400).json({
                error: "Ocorreu um erro ao criar seu usuário",
            });
        }

    });
}