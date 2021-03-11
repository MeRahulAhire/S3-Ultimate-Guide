document.getElementById('presignedUrlBtn').addEventListener('click', () => {
	const presignedUrl_fileInput = document.getElementById('presignedUrl');
	const file = presignedUrl_fileInput.files[0];
	const fileName = file.name;

	const url = `https://68qb5fre0e.execute-api.ap-south-1.amazonaws.com/dev/getSignedUrl`;
	

	axios
		.post(url, { fileName: fileName })
		.then((r) => {
			console.log(r);
			const url = r.data.preSignedUrl;
			axios.put(url, file).then((r) => console.log(r)).catch((err) => console.error(err));
		})
		.catch((err) => {
			console.error(err);
		});
});
