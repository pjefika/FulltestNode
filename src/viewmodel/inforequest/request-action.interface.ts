import { InfoRequest } from "./inforequest";

export class RequestActionInterface {

    constructor() { }

    public request(infoResquest: InfoRequest): any { };

    public post(infoResquest: InfoRequest): any { };

    public get(infoResquest: InfoRequest): any { };

}