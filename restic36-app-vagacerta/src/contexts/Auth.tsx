import React, { useState, createContext, ReactNode } from 'react';
import api from '../services/api';
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
	const AUTH_KEY = '@Auth';

	async function login({ email, senha }: { email: string; senha: string }) {
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
			await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
		} catch (error) {
			console.log('Login falhou.');
		}
	}

	function logout() {
		setUser({ email: '', senha: '', token: '' });
		AsyncStorage.removeItem(AUTH_KEY);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };
