import { APIhandler, OneAPIError } from "~/utils/types";
import ErrorBuilder from "~/utils/errors";
import APIerror from "~/utils/APIerror";
import Joi from "joi";

type Schema = { [key: string]: Schema } | Joi.AnySchema;

export const validate =
    (schema: Schema): APIhandler =>
    (req, res, next) => {
        const err = new APIerror();

        function goThroughObject(obj: Schema, data: any, been: string[] = []) {
            for (const [key, value] of Object.entries(obj)) {
                const wherearewe = [...been, key];

                if (
                    value instanceof Object &&
                    !value.hasOwnProperty("$_root")
                ) {
                    goThroughObject(value, data[key] || {}, wherearewe);
                    continue;
                }

                const { error } = (value as Joi.AnySchema).validate(data[key]);
                if (!error) continue;

                const errors: OneAPIError[] = error.details.map((d) => {
                    return new ErrorBuilder(1002)
                        .setMessage(
                            d.message.replace("value", wherearewe.join("."))
                        )
                        .build();
                });

                err.add(...errors);
            }
        }

        goThroughObject(schema, req);

        if (err.hasErrors()) next(err.return(400));
        else next();
    };
