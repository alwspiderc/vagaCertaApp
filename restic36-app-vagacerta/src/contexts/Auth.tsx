import React, { useState, createContext, ReactNode } from 'react';
import api, { AUTH_KEY } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
	children: ReactNode;
}

interface User {
	email: string;
	senha: string;
	token: string;
}

const AuthContext = createContext<{
	user: User;
	login: (credentials: { email: string; senha: string }) => Promise<void>;
	logout: () => void;
}>({
	user: {
		email: '',
		senha: '',
		token: ''
	},
	login: async () => {},
	logout: () => {}
});

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({
		email: '',
		senha: '',
		token: ''
	});

	async function login({ email, senha }: { email: string; senha: string }) {
		console.log('Login: ', email, senha);
		try {
			const response = await api.post('usuarios/login', {
				email: email,
				senha: senha
			});

			setUser({
				email: email,
				senha: senha,
				token: response.data.token
			});

			await AsyncStorage.setItem(
				AUTH_KEY,
				JSON.stringify({
					email: email,
					senha: senha,
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

	function logout() {
		setUser({ email: '', senha: '', token: '' });
		AsyncStorage.removeItem(AUTH_KEY);
		api.defaults.headers.common.Authorization = null;
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };
