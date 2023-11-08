import type { IParameter } from 'types';

import Parameter from 'core/Parameter';

export default (data: Parameter[]) => {
    const parameters: IParameter[] = [];

    for (let parameter of data) {
        parameters.push(
            parameter.build()
        );
    }

    return parameters;
}