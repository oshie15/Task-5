exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Basic test function working!',
            timestamp: new Date().toISOString(),
            event: {
                path: event.path,
                httpMethod: event.httpMethod,
                queryStringParameters: event.queryStringParameters
            }
        })
    };
}; 