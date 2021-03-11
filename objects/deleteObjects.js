const AWS = require('aws-sdk');
const s3 = new AWS.S3();

var params = {                 
	Bucket: 'bucket-name',
	Delete: {
		Objects: [
			{
				Key: 'objectkey1'
			},
			{
				Key: 'objectkey2'
			}
		],
		Quiet: false
	}
};
s3.deleteObjects(params, function(err, data) {              //for deleting multiple objects
	if (err)
		console.log(err, err.stack); // an error occurred
	else console.log(data); // successful response
	
});
