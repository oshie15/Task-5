const { faker } = require('@faker-js/faker');
const seedrandom = require('seedrandom');

exports.handler = async (event, context) => {
    try {
        // Test if dependencies are working
        const rng = seedrandom('test');
        const testName = faker.person.firstName();
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Debug function working!',
                testName: testName,
                randomValue: rng(),
                timestamp: new Date().toISOString(),
                dependencies: {
                    faker: typeof faker,
                    seedrandom: typeof seedrandom
                }
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString()
            })
        };
    }
}; 