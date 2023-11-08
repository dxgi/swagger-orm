import type { IServer, IRequest, IParameter, IResponse } from 'types';

import RequestBody from 'functions/RequestBody';
import Parameters from 'functions/Parameters';
import Responses from 'functions/Responses';

import Parameter from 'core/Parameter';
import Response from 'core/Response';
import Example from 'core/Example';

import { toPath } from 'components/helper';

export default class {
    private method: string;

    private _tags: string[];

    private _summary: string;

    private _description: string;

    private _operationId: string;

    private _servers?: IServer[];

    private _requestBody?: IRequest;
    
    private _parameters?: IParameter[];

    private _responses?: Record<string, IResponse>;

    private _security?: {
        Authorization: any[]
    }[];

    public constructor(method: string, operationId: string) {
        this.method = method;
        this._tags = [];
        this._summary = '';
        this._description = '';
        this._operationId = operationId;
    }

    public tags(...tags: string[]): this {
        this._tags = tags;

        return this;
    }

    public summary(summary: string, copyToDescription: boolean = false): this {
        this._summary = summary;

        if (copyToDescription)
            this._description = summary;

        return this;
    }

    public description(description: string): this {
        this._description = description;

        return this;
    }

    public servers(...servers: string[]): this {
        this._servers = servers.map(server => ({
            url: server
        }));

        return this;
    }

    public requestBody(requestBody: Record<string, any>): this {
        this._requestBody = RequestBody(requestBody);

        return this;
    }

    public parameters(parameters: Parameter[]): this {
        this._parameters = Parameters(parameters);

        return this;
    }

    public responses(responses: Response[]): this {
        this._responses = Responses(responses);

        return this;
    }

    public security(): this {
        this._security = [
            {
                Authorization: []
            }
        ];

        return this;
    }

    public build() {
        const { method, _tags, _summary, _description, _operationId, _servers, _requestBody, _parameters, _responses, _security } = this;

        const path: {
            [key: string]: any;
        } = {};

        path[method] = {
            tags: _tags,
            summary: _summary,
            description: _description,
            operationId: _operationId,
            servers: _servers,
            requestBody: _requestBody,
            parameters: _parameters,
            responses: _responses,
            security: _security
        }

        return path;
    }

    /* ----- STATIC METHODS ----- */
    public static Response = Response;
    public static Example = Example;
    public static Parameter = Parameter;

    public static Path = Parameter.Path;
    public static Query = Parameter.Query;
    public static Header = Parameter.Header;
    public static Cookie = Parameter.Cookie;

    public static ToPath = toPath;
}