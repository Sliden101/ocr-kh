import { OneAPIError, APIthrow } from "./types";

export default class APIerror {
    constructor(...i: OneAPIError[]) {
        this.add(...i);
    }

    errors: OneAPIError[] = [];

    static isIt = (obj: any): obj is APIthrow =>
        typeof obj == "object" && "code" in obj && "errors" in obj;
    hasErrors = () => !!this.errors.length;
    hasError = (err: number) => !!this.errors.find((x) => x.status == err);

    add = (...i: OneAPIError[]) => {
        for (let e of i) this.errors.push(e);
        return this;
    };

    return = (code: number): APIthrow => ({ code, errors: this.errors });
}
