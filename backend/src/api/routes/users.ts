import db from "../../db";
import middleware from "../middleware";
import type { Request, Response } from 'express';
import isAdmin from "../isadmin";
import bcrypt from "bcrypt";
import { validateFormNewUser } from "../../utils/formValidation";

export default function route(app) {
    app.get("/users", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        const users = await db.users.getAll();
        return res.send(users);
    })

    app.post("/users", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            const form = validateFormNewUser(req.body);
            if(!form.valid) {
                return res.status(400).json({
                    error: form.error
                });
            }

            req.body.password = bcrypt.hashSync(req.body.password, 10);
            await db.users.insert(req.body);
            return res.sendStatus(201);
        } catch (e) {
            console.log(e)
            if('code' in e && e.code == '23505') {
                return res.status(400).json({
                    error: "Já existe usuário com este email, por favor digite outro"
                });
            }
            return res.sendStatus(400);
        }
    })

    app.put("/users/:id", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            if(req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }
            await db.users.update(req.params.id, req.body);
            return res.sendStatus(200);
        } catch (e) {
            console.log(e)
            if('code' in e && e.code == '23505') {
                return res.status(400).json({
                    error: "Já existe usuário com este email, por favor digite outro"
                });
            }
            return res.sendStatus(400);
            
        }
    })

    app.delete("/users/:id", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            await db.users.delete(req.params.id);
            return res.sendStatus(200);
        } catch (e) {
            console.log(e)
            return res.sendStatus(400);
        }
    })

}