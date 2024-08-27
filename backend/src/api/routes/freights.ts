import db from "../../db";
import middleware from "../middleware";
import type { Request, Response } from 'express';
import { calculateFreightPrice, formatMoney } from "../../utils/utils";
import isAdmin from "../isadmin";
import { validateFormNewFreight } from "../../utils/formValidation";

export default function route(app) {
    app.get("/freights", middleware, async (req: Request, res: Response) => {
        const freights = await db.freights.getAllWithVehicle();
        for (let i = 0; i < freights.length; i++) {
            const prices = calculateFreightPrice(freights[i].distance, freights[i].vehicle.weight);

            freights[i].price = formatMoney(prices.price);
            freights[i].rate = formatMoney(prices.rate);
        }

        return res.send(freights);
    })

    app.post("/freights", middleware, async (req: Request, res: Response) => {
        if(!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        const form = validateFormNewFreight(req.body);
        if(!form.valid) {
            return res.status(400).json({
                error: form.error
            });
        }
        try {
            await db.freights.insert(req.body);
            return res.sendStatus(201);
        } catch (e) {
            console.log(e, typeof e)
            if('code' in e && e.code == '23503') {
                return res.status(400).json({
                    error: "Escolha uma placa válida"
                });
            }
            
            return res.sendStatus(400);
        }
    })

    app.put("/freights/:id", middleware, async (req: Request, res: Response) => {
        if(!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            await db.freights.update(req.params.id, req.body);
            return res.sendStatus(200);
        } catch (e) {
            return res.sendStatus(400);
        }
    })

    app.delete("/freights/:id", middleware, async (req: Request, res: Response) => {
        if(!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            await db.freights.delete(req.params.id);
            return res.sendStatus(200);
        } catch (e) {
            return res.sendStatus(400);
        }
    })

}