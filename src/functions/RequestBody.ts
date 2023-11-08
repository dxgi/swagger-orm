import type { IRequest } from 'types';

import Recursive from 'components/Recursive';

export default (data: Record<string, any>): IRequest => {
    return {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: Recursive(data)
                }
            }
        },
        required: true
    }
}