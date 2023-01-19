///<reference path="declarations/registry.d.ts"/>

const Registry = {} as RegistryTypes;
const InstanceRegistry = {} as RegistryTypes;

type ContainerName = keyof RegistryTypes;
type UnitName<CN extends ContainerName> = keyof typeof RegistryTypes[CN];

export function registerUnit<
    CN extends ContainerName,
    UN extends UnitName<CN>,
>( containerName: CN, unitName: UN): ClassDecorator

export function registerUnit<
    CN extends ContainerName,
    UN extends UnitName<CN>,
    Instance extends RegistryTypes[CN][UN]
>(containerName: CN, unitName: UN, instance: Instance): void

export function registerUnit<
    CN extends ContainerName,
    UN extends UnitName<CN>,
    Instance extends RegistryTypes[CN][UN]
>(containerName: CN, unitName: UN, instance?: Instance) {
    Registry[containerName] = Registry[containerName] || {};

    if (instance !== undefined) {
        Registry[containerName][unitName] = instance;
        return;
    }

    return (constructor: RegistryTypes[CN][UN]) => {
        Registry[containerName][unitName] = constructor;
    };
}

export function getUnit<
    CN extends ContainerName,
    UN extends UnitName<CN>,
>(containerName: CN, unitName: UN): RegistryTypes[CN][UN] {
    if (!Registry[containerName]?.[unitName]) {
        throw "";
    }

    return Registry[containerName][unitName];
}

export function getUnitSingleton<
    CN extends ContainerName,
    UN extends UnitName<CN>,
>(containerName: CN, unitName: UN): Instance<RegistryTypes[CN][UN]> {
    if (InstanceRegistry[containerName]?.[unitName] !== undefined) {
        return InstanceRegistry[containerName][unitName] as Instance<RegistryTypes[CN][UN]>;
    }

    if (!Registry[containerName]?.[unitName]) {
        throw "";
    }

    const constructor = Registry[containerName][unitName] as new (...args: any[]) => Instance<RegistryTypes[CN][UN]>;
    const instance = new constructor();

    InstanceRegistry[containerName] = InstanceRegistry[containerName] || {};
    InstanceRegistry[containerName][unitName] = instance as RegistryTypes[CN][UN];

    return instance;
}

export function getUnitList<CN extends ContainerName>(
    containerName: CN
): (keyof RegistryTypes[CN])[] {
    return Object.keys(Registry[containerName]) as (keyof RegistryTypes[CN])[];
}