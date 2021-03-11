const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const ab2b64 = require('ab2b64');
const fs = require('fs');
var params = {
	Bucket: 'bucket-name',
	Key: 'image.png'
};
s3.getObjectTorrent(params, function(err, data) {
	if (err) console.log(err, err.stack); // an error occurred

	const buff = data.Body.buffer;
	const base64String = ab2b64.ab2b64(buff);
	console.log(base64String);
	fs.writeFile('s3data.torrent', base64String, { encoding: 'base64' }); // create torrent file in present directory
});
