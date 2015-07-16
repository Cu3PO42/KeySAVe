declare module cuint {
    interface UINT32 {
        (num: number): UINT32;

        add(other: UINT32): UINT32;
        multiply(other: UINT32): UINT32;

        toNumber(): number;
    }
}

declare module "cuint" {
    var UINT32: cuint.UINT32;
}
