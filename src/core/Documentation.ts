import type { IDocumentation } from 'types';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export default class {
    private documentation: IDocumentation;

    constructor(documentation: Omit<IDocumentation, 'paths'>) {
        this.documentation = documentation;
    }

    public compile(data: any): IDocumentation {
        this.documentation.paths = data;

        return this.get();
    }

    private get() {
        return this.documentation;
    }
}