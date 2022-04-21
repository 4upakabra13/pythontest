const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
  await readUser().then(data => {
    data.Items.forEach(function(item) {
      console.log(item);
    });
    callback(null, {
        statusCode:200,
        body: data.Items,
        headers: {
        'Access-Control-Allow-Origin' : '*'
        },
        });
  }).catch((err) => {
    console.error(err);
  });
};

function readUser() {
  const params = {
    TableName: "users",
    limit:50
    
  };
 return ddb.scan(params).promise();
}
