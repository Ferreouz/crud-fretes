import db from "./db";
import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import { calculateFreightPrice } from "./utils/utils";
import cors from "cors";
import loginRoute from "./api/routes/login";
import vehicleRoute from "./api/routes/vehicles";
import freightRoute from "./api/routes/freights";
import userRoute from "./api/routes/users";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));

loginRoute(app);
vehicleRoute(app);
freightRoute(app);
userRoute(app);



app.listen(process.env.PORT || 8080, () => { });
