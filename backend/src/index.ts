import logger from "~/utils/logger";
import dotenv from "dotenv";
import app from "~/app";
import fs from "fs";
import http from "https";
import https from "https";

const httpPort = 3000;
const httpsPort = 3001;

const key = fs.readFileSync(__dirname + '/certsFiles/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/certsFiles/selfsigned.crt');

const credentials = {
    key: key,
    cert: cert
  };

let httpsServer = https.createServer(credentials, app);


logger.info("API", "Initiating listening to the port...");
httpsServer.listen(3001, () => {
    logger.success(
        "API",
        `API nest created and started listening to the specified port in the config`
    );
    logger.info(
        "API",
        `You can access the api on http://localhost:6969`
    );
    console.log("");
});
