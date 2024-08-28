import db from "../../db";
import middleware from "../middleware";
import type { Request, Response } from 'express';
import { calculateFreightPrice, formatMoney } from "../../utils/utils";
import isAdmin from "../isadmin";
import { validateFormNewFreight } from "../../utils/formValidation";
import { IFreightWithVehicle } from "../../db/freights/types";

export default function route(app) {
    app.get("/freights", middleware, async (req: Request, res: Response) => {
        let freights: IFreightWithVehicle[] = [];
        if (isAdmin(req.user)) {
            freights = await db.freights.getAllWithVehicle();
        } else {
            freights = await db.freights.getAllForDrivers(req.user.id);
        }

        for (let i = 0; i < freights.length; i++) {
            const prices = calculateFreightPrice(freights[i].distance, freights[i].vehicle.weight);

            freights[i].driver_receives = formatMoney(prices.price - prices.rate);
            freights[i].price = formatMoney(prices.price);
            freights[i].rate = formatMoney(prices.rate);
        }
        console.log(freights)
        return res.send(freights);
    })

    app.post("/freights", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        const form = validateFormNewFreight(req.body);
        if (!form.valid) {
            return res.status(400).json({
                error: form.error
            });
        }
        try {
            await db.freights.insert(req.body);
            return res.sendStatus(201);
        } catch (e) {
            console.log(e, typeof e)
            if ('code' in e && e.code == '23503') {
                return res.status(400).json({
                    error: "Escolha uma placa válida"
                });
            }

            return res.sendStatus(400);
        }
    })


    //Driver requesting freight
    app.post("/freights/request", middleware, async (req: Request, res: Response) => {
        if (isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            await db.freights.driverRequest(req.body.id, req.user.id);
            return res.sendStatus(200);
        } catch (e) {
            console.log(e)
            if ('code' in e && e.code == '23505') {
                return res.status(400).json({
                    error: "Você já solicitou este frete, aguarde a resposta da empresa"
                });
            }
            return res.sendStatus(400);
        }
    })

    //Admin accepting/denying freight request
    app.put("/freights/request", middleware, async (req: Request, res: Response) => {
        console.log(req.body)
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            await db.freights.adminUpdateFreightRequest(req.body.freight_id, req.body.driver_id, req.body.new_status);
            return res.sendStatus(200);
        } catch (e) {
            console.log(e)
            if ('code' in e && e.code == '23505') {
                return res.status(400).json({
                    error: "Você já solicitou este frete, aguarde a resposta da empresa"
                });
            }
            return res.sendStatus(400);
        }
    })

    app.put("/freights/:id", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
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
        if (!isAdmin(req.user)) {
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