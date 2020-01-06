const AWS = require('aws-sdk');
AWS.config.region = 'ap-southeast-2';
AWS.config.update();

const lambda = new AWS.Lambda();

exports.handler = function (event) {
    const params = {
        FunctionName: 'stripe', // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify(event)
    };
    console.log(AWS.config)
    return new Promise((resolve, reject) => {
        lambda.invoke(params, function (err, data) {
            if (err) {
                // context.fail(err);
                console.log(err);
                reject(err)
            } else {
                console.log('Lambda_B said ' + data.Payload);
                resolve(data)
            }
        })
    })
};

