import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';

import theme from './src/theme';

import { AuthProvider } from './src/contexts/Auth';
import { Route } from './src/routes/route';

export default function App() {
	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<StatusBar style="auto" />
				<Route />
			</ThemeProvider>
		</AuthProvider>
	);
}
