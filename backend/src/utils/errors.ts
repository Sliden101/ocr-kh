import { OneAPIError } from "./types";

const templates: { [key: number]: OneAPIError } = {
    0: {
        status: 0,
        code: "",
        message: "",
    },

    // Common HTTP errors
    400: {
        status: 400,
        code: "BAD_REQUEST",
        message:
            "The server could not understand the request due to invalid syntax.",
    },
    401: {
        status: 401,
        code: "UNAUTHORIZED",
        message:
            "The client must authenticate itself to get the requested response.",
    },
    403: {
        status: 403,
        code: "FORBIDDEN",
        message: "The client does not have access rights to the content.",
    },
    404: {
        status: 404,
        code: "NOT_FOUND",
        message: "The server can not find the requested resource.",
    },
    409: {
        status: 409,
        code: "CONFLICT_ERROR",
        message:
            "The request could not be completed due to a conflict with the current state of the resource.",
    },
    500: {
        status: 500,
        code: "INTERNAL_SERVER_ERROR",
        message:
            "The server has encountered a situation it doesn't know how to handle.",
    },
    502: {
        status: 502,
        code: "BAD_GATEWAY",
        message:
            "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
    },
    503: {
        status: 503,
        code: "SERVICE_UNAVAILABLE",
        message: "The server is not ready to handle the request.",
    },

    // Custom errors
    1000: {
        status: 500,
        code: "NOT_RETURNED_API_ERROR",
        message:
            "The api error was declared but not returned with a valid status code. " +
            "This is a server side code issue, do not mind it unless youre the " +
            "stupid developer that forgot to call the return function",
    },
    1001: {
        status: 503,
        code: "DATABASE_ERROR",
        message: "There was an error when communicating with the database.",
    },
    1002: {
        status: 400,
        code: "VALIDATION_ERROR",
        message: "One or more fields failed validation.",
    },
    1003: {
        status: 409,
        code: "UNIQUE_CONSTANT_VIOLATION",
        message: "The provided details has already been used",
    },
};

export default class ErrorBuilder {
    constructor(code: number = 0) {
        const template = templates[code];
        if (!template) {
            throw new Error(`Error template for code ${code} not found.`);
        }

        this.error = { ...template };
    }

    static isIt = (obj: any): obj is OneAPIError =>
        typeof obj == "object" &&
        "status" in obj &&
        "code" in obj &&
        "message" in obj;

    error!: OneAPIError;
    setStatus = (i: number) => {
        this.error.status = i;
        return this;
    };
    setCode = (i: string) => {
        this.error.code = i;
        return this;
    };
    setMessage = (i: string) => {
        this.error.message = i;
        return this;
    };

    build = () => ({ ...this.error });
}
