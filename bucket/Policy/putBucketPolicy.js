const AWS = require('aws-sdk');
const s3 = new AWS.S3();

var params = {
	Bucket: 'bucket-name',
	Policy: `{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::bucket-name/*"
                ]
            }
        ]
    }`
};
s3.putBucketPolicy(params, function(err, data) {
	if (err)
		console.log(err, err.stack); // an error occurred
	else console.log(data); // successful response
});
