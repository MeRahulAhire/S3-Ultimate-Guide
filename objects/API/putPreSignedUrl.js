const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-south-1' });

exports.handler = async (event) => {
	const body = JSON.parse(event.body);
	const fileName = body.fileName;

	try {
		const params = { Bucket: process.env.bucketName, Key: fileName };
		const url = await s3.getSignedUrl('putObject', params);
		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ preSignedUrl: url })
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ error: err })
		};
	}
};
