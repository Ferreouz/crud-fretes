import jwt from "jsonwebtoken";

export default function middleware(req, res, next) {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        return res.sendStatus(401);
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(401);
    }
};