const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-south-1' });

exports.handler = async (event) => {
	const body = JSON.parse(event.body);
	const fileName = body.fileName;
	const base64String = body.base64String;
	const buffer = Buffer.from(base64String, 'base64');

	try {
		const params = {
			Body: buffer,
			Bucket: process.env.bucketName,
			Key: fileName,
		};

		await s3.putObject(params).promise();

		return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: `file Uploaded`
		};
	} catch (err) {
		console.log(err);
		return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify(err)
		};
	}
};
