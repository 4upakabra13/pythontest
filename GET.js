const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

exports.handler = async (event, context, callback) => {
  await readId().then(data => {
    data.Items.forEach(function(item) {
      console.log(item.user_id);
    });
  }).catch((err) => {
    console.log('404');
  });
};

function readId() {
  const params = {
    TableName: "users",
    KeyConditionExpression: "user_id = :a",
    ExpressionAtributeValues: {
      ":a": "1"
    }
    
  };
 return ddb.scan(params).promise();
}