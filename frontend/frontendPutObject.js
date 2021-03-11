document.getElementById('putObjectBtn').addEventListener('click', () => {
	const putObject_fileInput = document.getElementById('putObject');
	const file = putObject_fileInput.files[0];
	const fileName = file.name;

	const reader = new FileReader();
	const url = `https://68qb5fre0e.execute-api.ap-south-1.amazonaws.com/dev/putObject`;
	const config = {
		onUploadProgress: (progressEvent) =>
			console.log(parseInt(Math.round(progressEvent.loaded / progressEvent.total * 100)))
	};

	reader.onloadend = () => {
		const base64String = reader.result.split('base64,')[1];

		const dataInfo = {
			fileName: fileName,
			base64String: base64String
		};

		axios
			.post(url, dataInfo, config)
			.then((r) => {
				console.log(r);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	reader.readAsDataURL(file);
});
