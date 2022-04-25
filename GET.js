const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
  await readUser().then(data => {
    data.Items.forEach(function(item) {});
    if (data.Items.length === 0) {
      callback('404');}
      else
        {callback(null, {
        body: data.Items
        });};
    // callback(null, {
    //     body: data.Items
    //     });
  }).catch((error) => {
    console.log(error);
  });
};

function readUser() {
  const params = {
    TableName: "users",
    KeyConditionExpression: "#user_id = :user_id",
    ExpressionAttributeNames:{
        "#user_id": "user_id"
        },
    ExpressionAttributeValues: {
      // insert a user_id here
        ":user_id":"b4e31168-0059-419a-965c-8a60b54ca6d4"
        }
  };
 return ddb.query(params).promise();
}
