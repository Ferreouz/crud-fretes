import db from "./db";
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { calculateFreightPrice } from "./logic/logic";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.get("/vehicles", async (req: Request, res: Response) => {
    const vehicles = await db.vehicles.getAll();
    return res.send(vehicles);
})

// app.post("/vehicles", async (req: Request, res: Response) => {
//     return res.send(await db.vehicles.getAll());
// })

app.get("/freights", async (req: Request, res: Response) => {
    const freights = await db.freights.getAllWithVehicle();
    for (let i = 0; i < freights.length; i++) {
        const prices = calculateFreightPrice(freights[i].distance, freights[i].vehicle.weight);

        freights[i].price = prices.price;
        freights[i].rate = prices.rate;
    }

    return res.send(freights);
})

app.post("/freights", async (req: Request, res: Response) => {
    try {
        await db.freights.insert(req.body);
        return res.sendStatus(201);
    }catch(e) {
        return res.sendStatus(400);
    }
})

app.put("/freights/:id", async (req: Request, res: Response) => {
    try {
        await db.freights.update(req.params.id, req.body);
        return res.sendStatus(200);
    }catch(e) {
        return res.sendStatus(400);
    }
})

app.delete("/freights/:id", async (req: Request, res: Response) => {
    try {
        await db.freights.delete(req.params.id);
        return res.sendStatus(200);
    }catch(e) {
        return res.sendStatus(400);
    }
})


app.listen(process.env.PORT || 8080, () => { });
