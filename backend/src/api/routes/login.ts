import jwt from "jsonwebtoken";
import db from "../../db";
import bcrypt from "bcrypt";
import middleware from "../middleware";
import { IUser } from "../../db/users/types";
import { validateFormNewUser } from "../../utils/formValidation";

export default function route(app) {
    app.post("/auth/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(401).json({
                    error: "Credenciais Inválidas"
                });
            }
            const whateverPass = bcrypt.hashSync(bcrypt.genSaltSync(15), 10);
    
            const user = await db.users.get(email);
            const correctPass = bcrypt.compareSync(password, user?.password || whateverPass);

            if (!user || !user.email || !correctPass) {
                return res.status(401).json({
                    error: "Credenciais Inválidas"
                });
            }

            if (user.active == false) {
                return res.status(401).json({
                    error: "Sua conta foi desativada, entre em contato com o suporte para saber o motivo"
                });
            }

            delete user.password;
            const access_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({ access_token });
            
        } catch (error) {
            console.log("Error in /auth/login", error)
            return res.status(401).json({
                error: "Credenciais Inválidas"
            }); 
        }

    });

    app.post("/auth/register", async (req, res) => {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({
                error: "Por favor, digite todos os campos",
            });
        }
        const userTemp = { email, password, name, type: 'driver' } as IUser;
        const form = validateFormNewUser(userTemp);
        if (!form.valid) {
            return res.status(400).json({
                error: form.error
            });
        }

        const hashedPass = bcrypt.hashSync(password, 10);
        try {
            userTemp.password = hashedPass;
            const id = await db.users.create(userTemp);
            console.log("Register says:", id)
            delete userTemp.password;
            userTemp.id = id;
            const access_token = jwt.sign(userTemp, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({
                access_token,
            });
        } catch (e) {
            console.log("Error in /auth/register", e)
            if ('code' in e && e.code == '23505') {
                return res.status(400).json({
                    error: "Já existe um usuario com este email, por favor digite outro"
                });
            }
            return res.status(400).json({
                error: "Ocorreu um erro ao criar seu usuário",
            });
        }

    });

    app.get("/auth/check", middleware, async (req, res) => {
        return res.status(200).json(req.user);
    });

}