import type { IProperties } from 'types';

import { isObject, isArray, toType } from 'components/helper';
import OneOf from 'components/OneOf';

export default function Recursive(data: Record<string, any>): IProperties {
    const properties: IProperties = {};

    for (const key in data) {
        if (isObject(data[key])) {
            properties[key] = {
                type: 'object',
                properties: Recursive(data[key])
            }
        } else if (isArray(data[key])) {
            properties[key] = {
                type: 'array',
                items: {
                    type: 'object',
                    oneOf: OneOf(data[key])
                }
            }
        } else {
            properties[key] = {
                type: toType(data[key]),
                example: data[key]
            }
        }
    }

    return properties;
}