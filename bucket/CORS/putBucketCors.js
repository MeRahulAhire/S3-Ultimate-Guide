const AWS = require('aws-sdk');
const s3 = new AWS.S3();

var params = {
	Bucket: 'bucket-name',
	CORSConfiguration: {
		CORSRules: [
			{
				AllowedHeaders: [ '*' ],
				AllowedMethods: [ 'PUT', 'POST', 'DELETE' ],
				AllowedOrigins: [ '*' ],
				ExposeHeaders: [ 'x-amz-server-side-encryption' ],
				MaxAgeSeconds: 3000
			},
			{
				AllowedHeaders: [ 'Authorization' ],
				AllowedMethods: [ 'GET' ],
				AllowedOrigins: [ '*' ],
				MaxAgeSeconds: 3000
			}
		]
	}
};
s3.putBucketCors(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });