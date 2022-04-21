const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = async (e, context, callback) => {
  const requestId = context.awsRequestId;
  await addUser(requestId).then(() =>{
    callback(null, {
      statusCode: 201,
      body: '',
    })
  }).catch((err) => {
    console.error(err)
  });  
};

function addUser(requestId) {
  const params = {
    TableName: 'users',
    // I didn't know how to make a proper user input so just included a static example
    Item: {
      'user_id': requestId,
      'Name': 'Nick',
      'Age': '90'
    }
  }
  return ddb.put(params).promise();
}