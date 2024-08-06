import { APIhandler } from "~/utils/types";

// This is the route "{prefix}/"

export const handler: APIhandler = async (req, res, throwerr) => {
    res.status(200).json({
        message: "Hello world",
    });
};
