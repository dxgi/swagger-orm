import type { IProperty, IExamples } from 'types';

import Example from 'core/Example';

import StatusCode from 'components/StatusCode';
import Recursive from 'components/Recursive';

export default class Response {
    public code: number;

    private description: string;

    private value: Record<string, any> | Example[];

    constructor(code: number, value?: Record<string, any> | Example[]) {
        this.code = code;

        this.description = StatusCode(code);

        if (value)
            this.value = value;
        else
            this.value = {
                message: this.description,
                data: {

                }
            };
    }

    public build() {
        return {
            description: this.description,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: this.Properties(),
                        oneOf: this.OneOf(),
                        examples: this.Examples()
                    }
                }
            }
        }
    }

    /* ----- STATIC METHODS ----- */
    private Properties = () => {
        if (Array.isArray(this.value))
            return undefined;

        const data = this.value as Record<string, any>;

        if (data['message'] && !data['data'])
            data['data'] = {};

        return Recursive(data);
    }

    private OneOf() {
        if (!Array.isArray(this.value))
            return undefined;

        const oneOf: IProperty[] = [];

        for (const key in this.value) {
            const example = this.value[key];

            if (!example)
                continue;

            oneOf.push({
                type: 'object',
                properties: Recursive(example.build().value)
            });
        }

        return oneOf;
    }

    private Examples() {
        if (!Array.isArray(this.value))
            return undefined;

        const examples: IExamples = {};

        for (const example of this.value)
            examples[example.title] = example.build();

        return examples;
    }
}