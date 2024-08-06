import { errorHandler } from "~/middleware/errorHandler";
import { registerRoutes } from "~/utils/routeRegister";
import express from "express";
import helmet from "helmet";

const app = express();

app.disable("x-powered-by");
app.use(express.json({limit: '50mb'}));
app.use(helmet());
app.use("/", registerRoutes());
app.use(errorHandler);

export default app;
