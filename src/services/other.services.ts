import axios from 'axios';
function Url2File() {
	const convertUrlsToFiles = async (urls: string[]) => {
		 try {
				const filePromises = urls.map(async (url) => {
					const response = await axios.get(url, { responseType: 'blob' });
					const blob = response.data;
					const filename = getFilenameFromUrl(url);
					return new File([blob], filename, { type: blob.type });
				});

				const files = await Promise.all(filePromises);
				return files;
			} catch (error) {
				console.error('Error converting URLs to files:', error);
				return [];
			}
	};

	const getFilenameFromUrl = (url: string) => {
		const path = url.split('/');
		return path[path.length - 1];
	};
	return { convertUrlsToFiles };
}

export default Url2File;
