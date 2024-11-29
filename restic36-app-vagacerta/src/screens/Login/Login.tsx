import React, { useContext } from 'react';
import { Image } from 'react-native';
import { useState } from 'react';

import api from '../../services/api';
import {
	Wrapper,
	Container,
	Form,
	TextContainer,
	TextBlack,
	TextLink,
	TextLinkContainer
} from './styles';
import { Formik } from 'formik';

import * as yup from 'yup';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { AuthContext } from '../../contexts/Auth';

export default function Login({ navigation }) {
	const { login } = useContext(AuthContext);

	const handleLogin = async (values: { email: string; senha: string }) => {
		login(values);
	};

	const loginValidationSchema = yup.object().shape({
		email: yup
			.string()
			.email('⚠️ Insira um e-mail válido.')
			.required('⚠️ Campo e-mail não pode ser vazio.'),
		senha: yup
			.string()
			.min(4, '⚠️ A senha deve ter no mínimo 4 caracteres.')
			.required('⚠️ Campo senha não	pode ser vazio.')
	});

	return (
		<Wrapper>
			<Image source={BGTop} />

			<Container>
				<Formik
					initialValues={{ email: '', senha: '' }}
					validateOnMount={true}
					onSubmit={(values) => handleLogin(values)}
					validationSchema={loginValidationSchema}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
						isValid,
						touched
					}) => (
						<Form>
							<Logo />
							<Input
								autoCapitalize="none"
								label="E-mail"
								placeholder="digite seu e-mail"
								value={values.email}
								onBlur={handleBlur('email')}
								onChangeText={handleChange('email')}
							/>
							<Input
								label="Senha"
								placeholder="digite sua senha"
								onChangeText={handleChange('senha')}
								onBlur={handleBlur('senha')}
								value={values.senha}
							/>
							<Button
								title="Entrar"
								noSpacing={true}
								variant="primary"
								onPress={() => handleSubmit()}
							/>
							<TextContainer>
								<TextBlack>Não tem uma conta?</TextBlack>
								<TextLinkContainer
									onPress={() => navigation.navigate('FormScreen')}
								>
									<TextLink>Crie agora mesmo.</TextLink>
								</TextLinkContainer>
							</TextContainer>
						</Form>
					)}
				</Formik>
			</Container>
		</Wrapper>
	);
}
