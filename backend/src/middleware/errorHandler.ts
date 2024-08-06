import ErrorBuilder from "~/utils/errors";
import { Request, Response, NextFunction } from "express";
import { APIthrow } from "~/utils/types";
import APIerror from "~/utils/APIerror";
import logger from "~/utils/logger";

// Error handling middleware
export const errorHandler = (
    err: Error | APIthrow,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Check if its not a non returned api error
    if (err instanceof APIerror) {
        res.status(500).json(
            // Not returned ApiError
            err.add(new ErrorBuilder(1000).build()).return(500)
        );
        logger.warn(
            " / ",
            `${req?.route?.path} route didnt have a return status code thrown error`
        );
        return;
    }

    // Check if its a non built api error
    if (err instanceof ErrorBuilder)
        return res
            .status(err.error.status)
            .json(new APIerror(err.build()).return(err.error.status));

    // Check if its an Built ErrorBuilder
    if (ErrorBuilder.isIt(err))
        return res
            .status(err.status)
            .json(new APIerror(err).return(err.status));

    // Check if its a returned APIerror
    if (APIerror.isIt(err)) return res.status(err.code).json(err);

    // Return if its unknown error type
    res.status(500).json(
        new APIerror(
            new ErrorBuilder()
                .setStatus(500)
                .setCode("UNKNOWN_ERROR")
                .setMessage(err.toString())
                .build()
        )
    );
    logger.error(
        " / ",
        `${req?.route?.path} has encountered an weird uncatched error:`
    );
    console.error(err);
    next();
};
