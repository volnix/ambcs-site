const crypto = require('crypto');
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    console.log('Received event: ', event);
    
    let params;

    if (event.queryStringParameters && (event.queryStringParameters.year || event.queryStringParameters.type)) {

        let filters = [];

        params = {
            TableName: "AMBCS-Races",
            FilterExpression: "",
            ExpressionAttributeValues: {},
            ExpressionAttributeNames: {}
        };

        if (event.queryStringParameters.year) {
            params.ExpressionAttributeValues[":year"] = parseInt(event.queryStringParameters.year);
            params.ExpressionAttributeNames["#year"] = 'year';
            filters.push('#year = :year');
        }

        if (event.queryStringParameters.type) {
            params.ExpressionAttributeValues[":type"] = event.queryStringParameters.type;
            params.ExpressionAttributeNames["#type"] = 'type';
            filters.push('#type = :type');
        }

        params.FilterExpression = filters.join(' and ');
    } else {
        params = { TableName: "AMBCS-Races" };
    }

    console.log('Scan params: ', params);

    ddb.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error:", JSON.stringify(err, null, 2));
    
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({"error" : err})
            });
        } else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({"races" : data.Items})
            });
        }
    });
};