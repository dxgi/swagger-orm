export interface IDocumentation {
    openapi: '3.0.3';
    
    info: {
        title: string;
        description: string;
        version: string;
    };

    servers: IServer[];
    tags: ITag[];
    paths?: any;

    components: {
        securitySchemes: {
            Authorization: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
}

export interface IServer {
    url: string;
    description?: string;
}

export interface ITag {
    name: string;
}

export interface IRequest {
    content: IContent;
    required: boolean;
}

export interface IProperties {
    [key: string]: IProperty;
}

export interface IProperty {
    type: string;
    properties?: IProperties;
    example?: any;

    items?: {
        type: string;
        oneOf: IProperty[];
    }
}

export interface IParameter {
    name: string;
    in: 'path' | 'query' | 'header' | 'cookie';
    description: string;
    required: boolean;
    schema: IParameterSchema;
}

export interface IResponse {
    description: string;
    content: IContent;
}

export interface IExamples {
    [key: string]: IExample;
}

export interface IExample {
    summary: string;
    value: {
        [key: string]: any;
    };
}

interface IParameterSchema {
    type: 'string' | 'number';
    format?: string | undefined;
    enum?: string[] | undefined;
    example?: string | number | undefined;
}

interface IContent {
    'application/json': {
        schema: {
            type: string;
            properties: IProperties;
        };
        examples?: IExamples;
    }
}