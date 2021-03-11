const AWS = require('aws-sdk');
const s3 = new AWS.S3();

var params = {
	Bucket: 'bucket-name'
};
s3.listObjects(params, function(err, data) {
	if (err) console.log(err, err.stack);
	else console.log(data);
});

