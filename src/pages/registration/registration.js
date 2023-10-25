import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { AuthFormError, Button, H2, Input } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import styled from 'styled-components';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите логин')
		.matches(/^\w+$/, 'Неверные символы. Вводите латиницей только буквы и цифры.')
		.min(3, 'Неверное количество символов. Минимум три символа')
		.max(15, 'Неверное количество символов. Максимум 15 символов'),
	password: yup
		.string()
		.required('Введите пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверные символы для пароля. Допустимы только буквы, цифры, # и %',
		)
		.min(6, 'Неверная длина пароля. Минимум три символа')
		.max(30, 'Неверная длина пароля. Максиимум 15 символов'),
	passcheck: yup
		.string()
		.required('Введите пароль еще раз')
		.oneOf([yup.ref('Пароль'), null], 'Пароли не совпадают! Попробуйте еще раз'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Response error: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register('login', {
						onchange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register('password', {
						onchange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Повтор пароля"
					{...register('passcheck', {
						onchange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Регистрация
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
