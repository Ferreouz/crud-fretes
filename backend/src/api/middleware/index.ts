import jwt from "jsonwebtoken";
import db from "../../db";

const middleware = async (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        return res.sendStatus(401);
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        delete user.password;
        delete user.active;
        if((await db.users.get(user.email)).active == false) {
            return res.status(401).json({
                error: "Sua conta foi desativada, entre em contato com o suporte para saber o motivo"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(401);
    }
};
export default middleware