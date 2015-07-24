declare module StringFormat {
    interface FormatStatic {
        (formatString: string, ...args: any[]): string;
        create(transformers: {}): (formatString: string, ...args: any[]) => string;
        extend(obj: {}, ...args: {}[]);
    }
}

declare module "string-format" {
    var format: StringFormat.FormatStatic;
    export = format;
}
