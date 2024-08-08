import { errorHandler } from "~/middleware/errorHandler";
import { registerRoutes } from "~/utils/routeRegister";
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

app.disable("x-powered-by");

// Specify the allowed origins
const allowedOrigins = ["https://ocr-kh.vercel.app", "http://localhost:3000"];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(helmet());
app.use("/", registerRoutes());
app.use(errorHandler);

export default app;
