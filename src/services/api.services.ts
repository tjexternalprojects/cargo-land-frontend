import axios from 'axios';
import { LocalStorageServices, AuthServices } from '.';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// const navigate = useNavigate()

const instance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = `Bearer ${LocalStorageServices.getAccessToken()}`;
		if (token) {
			config.headers['authorization'] = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add a new interceptor to handle FormData objects with images
instance.interceptors.request.use(
	(config) => {
		if (config.data instanceof FormData) {
			config.headers['Content-Type'] = 'multipart/form-data';
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const originalConfig = err.config;
		if (
			(originalConfig.url !== '/user/login' || originalConfig.url !== '/user/register') &&
			err.response
		) {
			// Access Token was expired
			if (
				(LocalStorageServices.getAccessToken() &&
					err.response.data.Error == 'User not logged in') ||
				(err.response.status === 401 &&
					err.response.data.Error == 'token expired' &&
					!originalConfig._retry)
			) {
				originalConfig._retry = true;

				try {
					const rs = await instance.post('/user/regenerate-access-token', {
						refreshToken: LocalStorageServices.getRefreshToken(),
					});
					const { AccessToken } = rs.data;
					LocalStorageServices.setLocalAccessToken(AccessToken);
					return instance(originalConfig);
				} catch (_error: any) {
					if (_error.response.data == 'invalid refresh token') {
						localStorage.clear();
						// navigate('/login');
						window.location.reload();
						AuthServices().logout();
					}
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(err);
	}
);

export default instance;
