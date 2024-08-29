import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import loginRoute from "./api/routes/login";
import vehicleRoute from "./api/routes/vehicles";
import freightRoute from "./api/routes/freights";
import userRoute from "./api/routes/users";
import downloadRoute from "./api/routes/download";
import { generateReport } from './utils/generateReport';
import schedule from "node-schedule";
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
downloadRoute(app);
app.listen(process.env.PORT || 8080, () => { console.log("Backend Listening ON" + process.env.PORT || 8080) });


schedule.scheduleJob("0 8 * * *", async () => {
    try {
        await generateReport();
    } catch (error) {
        console.log("Error generating report: ")
        console.log(error)
    }
})
