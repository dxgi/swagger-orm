import type { IProperty } from 'types';

import { isObject, isArray, toType } from 'components/helper';
import Recursive from 'components/Recursive';

export default function OneOf(array: any[]): IProperty[] {
    const oneOf: IProperty[] = [];

    for (const content of array) {
        if (isObject(content)) {
            oneOf.push({
                type: 'object',
                properties: Recursive(content)
            })
        } else if (isArray(content)) {
            oneOf.push({
                type: 'array',
                items: {
                    type: 'object',
                    oneOf: OneOf(content)
                }
            })
        } else {
            oneOf.push({
                type: toType(content),
                example: content
            })
        }
    }

    return oneOf;
}