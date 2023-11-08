import Swagger from 'core/Swagger';

const rebuild = (sub: string, domain: string, swagger: Swagger) =>
    swagger.servers(`https://${sub}.${domain}/`).build();

export const isArray = (value: any) =>
    Array.isArray(value);

export const isObject = (value: any) =>
    typeof value === 'object' && !isArray(value);

export const toPath = (sub: string, domain: string, content: {
    [key: string]: Swagger | Swagger[]
}) => {
    const path: any = {};

    for (const key in content) {
        const item = content[key];

        if (!item)
            continue;

        if (Array.isArray(item)) {
            path[key] = {};

            for (const swagger of item) {
                const define = rebuild(sub, domain, swagger);

                path[key] = {
                    ...path[key],
                    ...define
                };
            }
        } else {
            const define = rebuild(sub, domain, item);

            path[key] = {
                ...define
            };
        }
    }

    return path;
}

export const toType = (value: any) =>
    isObject(value) ? 'object' : isArray(value) ? 'array' : typeof value;