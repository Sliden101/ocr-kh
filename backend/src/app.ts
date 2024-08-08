import { errorHandler } from "~/middleware/errorHandler";
import { registerRoutes } from "~/utils/routeRegister";
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.disable("x-powered-by");
app.use(express.json({limit: '50mb'}));
app.use(helmet());
app.use("/", registerRoutes());
app.use(errorHandler);

const allowedOrigins = ['http://localhost:3000','https://ocr-kh.vercel.app/'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

export default app;
