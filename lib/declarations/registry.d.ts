declare namespace RegistryTypes {
    namespace __ {
        export const __: never;
    }
}

type Instance<T> = T extends abstract new (...args: any[]) => infer C ? C : T;
type RegistryTypes = typeof RegistryTypes;