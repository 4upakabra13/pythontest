const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    const requestId = context.awsRequestId;
    if(event.user_id && event.fullname && event.age) {
    await createUser(requestId, event).then(() => {
        callback(null, {
            statusCode:201,
            body: '',
            headers: {
                'Access-Control-Allow-Origin' : '*'
                }
        })
    }).catch((err) => {
        console.error(err)
    });
    }else{
        callback(null, {
            statusCode:404,
            body: 'Bad Request',
            headers: {
                'Access-Control-Allow-Origin' : '*'
                }
            });
        }
    };
    

function createUser(requestId, event) {
  const params = {
    TableName: "users",
    Item: {
        'user_id' : requestId,
        'fullname': event.fullname,
        'age': event.age
    }
    
    
  }
 return ddb.put(params).promise();
};