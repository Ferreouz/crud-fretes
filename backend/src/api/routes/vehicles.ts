import db from "../../db";
import middleware from "../middleware";
import type { Request, Response } from 'express';

export default function route(app) {
    app.get("/vehicles", middleware, async (req: Request, res: Response) => {
        const vehicles = await db.vehicles.getAll();
        return res.send(vehicles);
    });
}