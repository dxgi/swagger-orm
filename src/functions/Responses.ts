import Response from 'core/Response';

export default (data: (Response | number)[]) => {
    const responses: {
        [key: string]: any
    } = { };

    for (let response of data) {
        if (typeof response === 'number')
            response = new Response(response);

        const { code } = response;

        responses[code] = response.build();
    }

    return responses;
}