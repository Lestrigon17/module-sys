/// <reference path="declarations/registry.d.ts" />


import { registerUnit } from "../../lib";

@registerUnit("Service", "ServiceOne")
export class ServiceOne {
    public run() { return 1; }
}