const AWS = require('aws-sdk');
const s3 = new AWS.S3({signatureVersion: 'v4', region: 'ap-south-1'});

var params = {Bucket: 'bucket-name', Key: 'image.png'};
var url = s3.getSignedUrl('getObject', params);
console.log('The URL is', url);