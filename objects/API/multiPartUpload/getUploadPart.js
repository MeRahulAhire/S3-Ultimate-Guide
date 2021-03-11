const AWS = require('aws-sdk');
const s3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-south-1' });
exports.handler = async (event) => {
    const body = JSON.parse(event.body)

    try {
        let params = {
            Bucket:process.env.bucketName,
            Key: body.fileName,
			PartNumber: body.partNumber,
			UploadId:body.uploadId
            
        };
        const preSignedUrl = await s3.getSignedUrl('uploadPart',params)
        return {
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({preSignedUrl : preSignedUrl})
		};
    } catch (err) {
        console.log(err)
        return {
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ error: err, details: err.stack })
		};
    }

    
}