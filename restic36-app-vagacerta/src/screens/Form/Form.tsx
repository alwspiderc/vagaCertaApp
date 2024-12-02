import React, { useState } from 'react';
import { Image } from 'react-native';
import {
	Wrapper,
	Container,
	Form,
	TextContainer,
	TextBlack,
	TextLink,
	TextLinkContainer
} from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { User } from '../../utils/Types';
import api from '../../services/api';

export default function FormScreen({ navigation }) {
	const [profile, setProfile] = useState<User>({
		id: 0,
		nome: '',
		email: '',
		senha: '',
		createAt: '',
		updateAt: ''
	});

	async function createProfile() {
		try {
			await api.post(`usuarios/register`, {
				nome: profile.nome,
				email: profile.email,
				senha: profile.senha
			});
			navigation.navigate('Login');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Wrapper>
			<Image source={BGTop} />

			<Container>
				<Form>
					<Logo />
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
						autoCapitalize="none"
					/>
					<Input
						label="Senha"
						placeholder="digite sua senha"
						value={profile.senha}
						onChangeText={(value) => setProfile({ ...profile, senha: value })}
						secureTextEntry={true}
					/>
					<Button
						title="Criar"
						noSpacing={true}
						variant="primary"
						onPress={createProfile}
					/>
				</Form>
			</Container>
		</Wrapper>
	);
}
