export default class {
    public title: string;

    private summary: string;

    private value: Record<string, any>;

    constructor(title: string, value: Record<string, any>) {
        this.title = title;
        this.summary = '';
        this.value = value;

        if (value['message'] && !value['data'])
            this.value['data'] = { };
    }

    public build() {
        const { summary, value } = this;

        return {
            summary,
            value
        }
    }
}