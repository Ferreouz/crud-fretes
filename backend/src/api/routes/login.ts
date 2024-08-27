import jwt from "jsonwebtoken";
import db from "../../db";
import bcrypt from "bcrypt";

export default function route(app) {
    app.post("/auth/login", async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                error: "Credenciais Inválidas"
            });
        }
        const whateverPass = bcrypt.hashSync(bcrypt.genSaltSync(15), 10);

        const user = await db.users.get(email);
        const correctPass = bcrypt.compareSync(password, user?.password || whateverPass);

        if (user && user.active == false) {
            return res.status(401).json({
                error: "Sua conta foi desativada, entre em contato com o suporte para saber o motivo"
            });
        }
        if (user && user.email && correctPass) {
            delete user.password;
            const access_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({ access_token });
        }

        return res.status(401).json({
            error: "Credenciais Inválidas"
        });
    });
}