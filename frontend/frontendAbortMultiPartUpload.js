document.getElementById('abortUploadBtn').addEventListener('click', () => {
	const multipartInput_fileInput = document.getElementById('multipartInput');
	const file = multipartInput_fileInput.files[0];
	const fileName = file.name;
	const uploadId = sessionStorage.getItem('uploadId');
	const url = `https://68qb5fre0e.execute-api.ap-south-1.amazonaws.com/dev`;
	console.log({ fileName: fileName, uploadId: uploadId });
	axios
		.post(`${url}/abortUpload`, { fileName: fileName, uploadId: uploadId })
		.then((r) => console.log(r))
		.catch((err) => console.error(err));
	clearInterval();
});
