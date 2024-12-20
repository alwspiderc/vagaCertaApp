import React, { useState, createContext, ReactNode, useEffect } from 'react';
import api, { AUTH_KEY } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Credentials } from '../utils/Types';

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthContextType {
	credentials: Credentials;
	login: (credentials: { email: string; senha: string }) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	credentials: {
		token: '',
		user: {
			id: 0,
			nome: '',
			email: '',
			senha: '',
			createAt: '',
			updateAt: ''
		}
	},
	login: async () => {},
	logout: () => {}
});

function AuthProvider({ children }: AuthProviderProps) {
	const [credentials, setCredentials] = useState<Credentials>({
		token: '',
		user: {
			id: 0,
			nome: '',
			email: '',
			senha: '',
			createAt: '',
			updateAt: ''
		}
	});

	async function login({ email, senha }: { email: string; senha: string }) {
		try {
			const response = await api.post('usuarios/login', {
				email: email,
				senha: senha
			});

			setCredentials({
				token: response.data.token,
				user: response.data.user
			});

			await AsyncStorage.setItem(
				AUTH_KEY,
				JSON.stringify({
					email: response.data.user.email,
					senha: response.data.user.senha,
					token: response.data.token
				})
			);

			await setToken(response.data.token);
		} catch (error) {
			console.log('Login falhou.');
		}
	}

	async function setToken(token: string) {
		api.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	useEffect(() => {
		async function loadStorageData() {
			const storage = await AsyncStorage.getItem(AUTH_KEY);

			if (storage) {
				const { email, senha, token } = JSON.parse(storage);

				setToken(token);

				setCredentials({
					token: token,
					user: {
						id: 0,
						nome: '',
						email: email,
						senha: senha,
						createAt: '',
						updateAt: ''
					}
				});
			}
		}

		loadStorageData();
	}, []);

	function logout() {
		setCredentials({
			token: '',
			user: {
				id: 0,
				nome: '',
				email: '',
				senha: '',
				createAt: '',
				updateAt: ''
			}
		});
		AsyncStorage.removeItem(AUTH_KEY);
		api.defaults.headers.common.Authorization = null;
	}

	return (
		<AuthContext.Provider value={{ credentials, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };
