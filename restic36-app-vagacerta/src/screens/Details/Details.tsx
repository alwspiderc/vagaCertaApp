import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import {
	Wrapper,
	Container,
	Header,
	HeaderButtonContainer,
	ButtonIcon,
	ButtonText,
	ContentContainer,
	Title,
	Description
} from './styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';

import { VagaProps } from '../../utils/Types';
import { Linking } from 'react-native';

export default function Details({ route, navigation }) {
	const id = route.params.id;
	const [vaga, setVaga] = useState<VagaProps>(null);

	const fetchVaga = async () => {
		try {
			const response = await api.get(`vagas/${id}`);
			const data = response.data.job;
			setVaga({
				id: data.id,
				status: data.status,
				title: data.titulo,
				date: data.dataCadastro,
				description: data.descricao,
				phone: data.telefone,
				company: data.empresa
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchVaga();
	}, [id]);

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

			{vaga ? (
				<Container>
					<ContentContainer>
						<Title>{vaga.title}</Title>
						<Description>{vaga.description}</Description>
					</ContentContainer>
					{vaga.status.toLowerCase() === 'aberta'.toLowerCase() && (
						<Button
							title="Entrar em contato"
							noSpacing={true}
							variant="primary"
							onPress={() => {
								Linking.openURL('https://www.whatsapp.com/');
							}}
						/>
					)}
				</Container>
			) : (
				<Title>Vaga não encontrada.</Title>
			)}
		</Wrapper>
	);
}
