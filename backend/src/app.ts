import { errorHandler } from "~/middleware/errorHandler";
import { registerRoutes } from "~/utils/routeRegister";
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.disable("x-powered-by");
app.use(cors);
app.use(express.json({limit: '50mb'}));
app.use(helmet());
app.use("/", registerRoutes());
app.use(errorHandler);

const allowedOrigins = ['https://ocr-kh.vercel.app'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options));

export default app;
