const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-south-1' });
exports.handler = async (event) => {
	const body = JSON.parse(event.body);

	try {
		const ttl = 20 * 60 * 1000;    // 20min = 20 x 60 x (1000ms or 1s)
		const expires = Date.now() + ttl;
		let params = {
			Bucket: process.env.bucketName,
			Key: body.fileName,
			Expires: expires
		};
		const multiPartUpload = await s3.createMultipartUpload(params).promise();
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ uploadId: multiPartUpload.UploadId })
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ error: err, details: err.stack })
		};
	}
};
