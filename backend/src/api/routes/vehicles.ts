import db from "../../db";
import middleware from "../middleware";
import type { Request, Response } from 'express';
import isAdmin from "../isadmin";

export default function route(app) {
    app.get("/vehicles", middleware, async (req: Request, res: Response) => {
        const vehicles = await db.vehicles.getAll();
        return res.send(vehicles);
    });

    app.get("/vehicleTypes", middleware, async (req: Request, res: Response) => {
        const types = await db.vehicles.types.getAll();
        return res.send(types);
    });

    app.post("/vehicles", middleware, async (req: Request, res: Response) => {
        if(!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            console.log(req.body)
            await db.vehicles.insert(req.body);
            return res.sendStatus(201);
        } catch (e) {
            console.log(e)
            return res.sendStatus(400);
        }
    })

    app.put("/vehicles/:plate", middleware, async (req: Request, res: Response) => {
        if(!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            console.log(req.body)
            await db.vehicles.update(req.params.plate, req.body);
            return res.sendStatus(200);
        } catch (e) {
            console.log(e)
            return res.sendStatus(400);
        }
    })

    app.delete("/vehicles/:plate", middleware, async (req: Request, res: Response) => {
        if(!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            console.log(req.body)
            await db.vehicles.delete(req.params.plate);
            return res.sendStatus(200);
        } catch (e) {
            console.log(e, typeof e)
            if('code' in e && e.code == '23503') {
                return res.status(400).json({
                    error: "Existe frete(s) usando este veículo, altere ou apague o frete para poder apagar este veículo"
                });
            }
            return res.sendStatus(400);
        }
    })
}