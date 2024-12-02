import React, { useContext, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
	Wrapper,
	Container,
	Header,
	HeaderButtonContainer,
	ButtonIcon,
	ButtonText,
	ContentContainer
} from './styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api';
import { AuthContext } from '../../contexts/Auth';
import { User } from '../../utils/Types';
import { View } from 'react-native';

export default function Profile({ navigation }) {
	const { credentials, logout } = useContext(AuthContext);
	const [senha, setSenha] = useState('');
	const [profile, setProfile] = useState<User>({
		id: 0,
		nome: '',
		email: '',
		senha: '',
		createAt: '',
		updateAt: ''
	});

	const fetchProfile = async () => {
		try {
			const response = await api.get(`usuarios/${credentials.user.id}`);
			setProfile(response.data.user);
		} catch (error) {
			console.log(error);
		}
	};

	async function updateProfile() {
		try {
			const response = await api.put(`usuarios/${profile.id}`, {
				nome: profile.nome,
				email: profile.email,
				...(senha && { senha: senha })
			});
			setProfile(response.data.user);
		} catch (error) {
			console.log(error);
		}
	}

	function handleLogout() {
		logout();
	}

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<Wrapper>
			<Header>
				<HeaderButtonContainer onPress={() => navigation.goBack()}>
					<ButtonIcon>
						<Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
					</ButtonIcon>
					<ButtonText>Voltar</ButtonText>
				</HeaderButtonContainer>
				<Logo />
			</Header>
			<View
				style={{
					width: '100%',
					alignItems: 'flex-end',
					paddingRight: 10
				}}
			>
				<Button
					style={{ width: 60 }}
					title="Sair"
					noSpacing={true}
					variant="secondary"
					onPress={handleLogout}
				/>
			</View>
			<Container>
				<ContentContainer>
					<Input
						label="Nome"
						placeholder="digite seu nome"
						value={profile.nome}
						onChangeText={(value) => setProfile({ ...profile, nome: value })}
					/>
					<Input
						label="E-mail"
						placeholder="digite seu e-mail"
						value={profile.email}
						onChangeText={(value) => setProfile({ ...profile, email: value })}
					/>
					<Input
						label="Senha"
						placeholder="digite sua senha"
						value={senha}
						onChangeText={setSenha}
					/>
				</ContentContainer>

				<Button
					title="Salvar informações"
					noSpacing={true}
					variant="primary"
					onPress={updateProfile}
				/>
			</Container>
		</Wrapper>
	);
}
