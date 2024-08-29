import middleware from "../middleware";
import type { Request, Response } from 'express';
import isAdmin from "../isadmin";
import { existsSync } from "fs";
import { generateReport } from "../../utils/generateReport";
export default function route(app) {
    app.get("/report/yesterday", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            const file = `relatorio.xlsx`;
            const fullPath = './reports/' + file;
            if(!existsSync(fullPath)) {
                return res.sendStatus(404);
            }
            res.setHeader('Content-disposition', 'attachment; filename=' + file);
            res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.download(fullPath);
        } catch (error) {
            return res.sendStatus(400);
        }
    });

    //for testing purposes
    app.post("/report/yesterday/generate", middleware, async (req: Request, res: Response) => {
        if (!isAdmin(req.user)) {
            return res.sendStatus(403);
        }
        try {
            await generateReport();
            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(400);
        }
    });
}