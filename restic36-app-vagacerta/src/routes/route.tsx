import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';

import Login from '../screens/Login/Login';
import FormScreen from '../screens/Form/Form';
import Profile from '../screens/Profile/Profile';
import Details from '../screens/Details/Details';
import List from '../screens/List/List';
import theme from '../theme';
import { AuthContext } from '../contexts/Auth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function App() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color }) => {
					let iconName: 'home' | 'home-outline' | 'person' | 'person-outline';

					if (route.name === 'Home') {
						iconName = focused ? 'home' : 'home-outline';
					} else if (route.name === 'Profile') {
						iconName = focused ? 'person' : 'person-outline';
					}

					return <Ionicons name={iconName} size={16} color={color} />;
				},
				tabBarActiveTintColor: theme.COLORS.GREEN,
				tabBarInactiveTintColor: theme.COLORS.GRAY_03,
				tabBarStyle: {
					backgroundColor: theme.COLORS.GRAY_01
				},
				tabBarLabelStyle: {
					fontWeight: 800
				}
			})}
		>
			<Tab.Screen name="Home">
				{() => (
					<HomeStack.Navigator screenOptions={{ headerShown: false }}>
						<HomeStack.Screen name="List" component={List} />
						<HomeStack.Screen name="Details" component={Details} />
					</HomeStack.Navigator>
				)}
			</Tab.Screen>
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}

export function Auth() {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="FormScreen" component={FormScreen} />
		</Stack.Navigator>
	);
}

export function Route() {
	const { credentials } = useContext(AuthContext);
	return (
		<NavigationContainer>
			{credentials.token ? <App /> : <Auth />}
		</NavigationContainer>
	);
}
