import { IParameter } from 'types';

export default class Parameter {
    public name: string;

    private location: 'path' | 'query' | 'header' | 'cookie';

    private _description: string;

    private _format: string | undefined;

    private _enum: string[] | undefined;

    private _required: boolean;

    private value: string | number;

    constructor(location: 'path' | 'query' | 'header' | 'cookie', name: string, value: string | number) {
        this.name = name;
        this.location = location;

        this._description = '';
        this._format = undefined;
        this._enum = undefined;
        this._required = false;

        this.value = value;
    }

    public description(description: string): this {
        this._description = description;

        return this;
    }

    public format(format: string) {
        this._format = format;

        return this;
    }

    public enum(...values: string[]): this {
        this._enum = values;

        return this;
    }

    public required(): this {
        this._required = true;

        return this;
    }

    public build(): IParameter {
        const { 
            name,
            location,
            _description,
            _required,
            _format,
            _enum,
            value
        } = this;

        const type = typeof value === 'string' ? 'string' : 'number';
        
        return {
            name,
            in: location,
            description: _description,
            required: _required,
            schema: {
                type,
                format: _format,
                enum: _enum,
                example: value
            }
        }
    }

    /* ----- STATIC METHODS ----- */
    static Path(name: string, value: string | number): Parameter {
        return new Parameter('path', name, value);
    }

    static Query(name: string, value: string | number) {
        return new Parameter('query', name, value);
    }

    static Header(name: string, value: string | number) {
        return new Parameter('header', name, value);
    }

    static Cookie(name: string, value: string | number) {
        return new Parameter('cookie', name, value);
    }
}