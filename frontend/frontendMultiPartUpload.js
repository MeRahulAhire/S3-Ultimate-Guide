document.getElementById('multipartInputBtn').addEventListener('click', async () => {
	const multipartInput_fileInput = document.getElementById('multipartInput');
	const file = multipartInput_fileInput.files[0];
	const fileName = file.name;
	const fileSize = file.size;
	const url = `https://68qb5fre0e.execute-api.ap-south-1.amazonaws.com/dev`;

	try {
		let res = await axios.post(`${url}/getUploadId`, { fileName: fileName });
		const uploadId = res.data.uploadId;
		console.log(res);

		// In react use useState. Beacause we are using plain javascript, I've used session storage to store the uploadID which we can use later to abort upload process
		sessionStorage.setItem('uploadId', uploadId);

		console.log('Inside uploadMultipartFile');
		const chunkSize = 10 * 1024 * 1024; // 10MiB
		const chunkCount = Math.floor(fileSize / chunkSize) + 1;
		console.log(`chunkCount: ${chunkCount}`);

		let multiUploadArray = [];

		
			for (let uploadCount = 1; uploadCount < chunkCount + 1; uploadCount++) {
				let start = (uploadCount - 1) * chunkSize;
				let end = uploadCount * chunkSize;
				let fileBlob = uploadCount < chunkCount ? file.slice(start, end) : file.slice(start);
	
				let getSignedUrlRes = await axios.post(`${url}/getUploadPart`, {
					fileName: fileName,
					partNumber: uploadCount,
					uploadId: uploadId
				});
				let preSignedUrl = getSignedUrlRes.data.preSignedUrl;
				console.log(`preSignedUrl ${uploadCount} : ${preSignedUrl}`);
				console.log(fileBlob);
				// Start sending files to S3 part by part
	
				let uploadChunck = await fetch(preSignedUrl, {   
					method: 'PUT',
					body: fileBlob
				});
				console.log(uploadChunck);
				let EtagHeader = uploadChunck.headers.get('ETag');
				console.log(EtagHeader);
				let uploadPartDetails = {
					ETag: EtagHeader,
					PartNumber: uploadCount
				};
	
				multiUploadArray.push(uploadPartDetails);
			}
		
		console.log(multiUploadArray);
		const completeUpload = await axios.post(`${url}/completeUpload`, {
			fileName: fileName,
			parts: multiUploadArray,
			uploadId: uploadId
		});

		console.log(completeUpload.data, 'complete upload response');
	} catch (err) {
		console.log(err, err.stack);
	}
	
});
