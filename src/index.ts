// Модульная система
import "../lib";
import { getUnit, getUnitSingleton, registerUnit } from "../lib";

// Сервисы
import "./ServiceOne";


// test call
const service_1 = getUnitSingleton("Service", "ServiceOne");
console.log("service_1.run() -> ", service_1.run());


const ServiceOne = getUnit("Service", "ServiceOne");

@registerUnit("Service", "ServiceOne")
class OverwriteServiceOne extends ServiceOne {
    public run(): number {
        return 2;
    }
}

const service_2 = getUnitSingleton("Service", "ServiceOne");
console.log("service_2.run() -> ", service_2.run());