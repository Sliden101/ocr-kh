import logger from "~/utils/logger";
import app from "~/app";

let port = 6969;


logger.info("API", "Initiating listening to the port...");
app.listen(port, () => {
    logger.success(
        "API",
        `API nest created and started listening to the specified port in the config`
    );
    logger.info(
        "API",
        `You can access the api on http://localhost:${port}`
    );
    console.log("");
});
