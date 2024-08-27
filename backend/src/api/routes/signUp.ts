import jwt from "jsonwebtoken";
import db from "../../db";
import bcrypt from "bcrypt";
import { IUser } from "../../db/users/types";

export default function route(app) {
    app.post("/auth/register", async (req, res) => {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                error: "Por favor, digite todos os campos",
            });
        }
        const hashedPass = bcrypt.hashSync(password, 10);
        console.log(req.body)
        try {
            const user = { email, password: hashedPass, name, type: 'driver' } as IUser;
            await db.users.create(user);
            delete user.password;
            const access_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({
                access_token,
            });
        } catch (error) {
            return res.status(400).json({
                error: "Ocorreu um erro ao criar seu usuário",
            });
        }

    });
}