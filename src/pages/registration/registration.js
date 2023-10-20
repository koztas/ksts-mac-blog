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
		.required('Enter login')
		.matches(
			/^\w+$/,
			'Invalid characters in login. Accepted characters: letters and numbers only.',
		)
		.min(3, 'Invalid login length. Minimum 3 characters')
		.max(15, 'Invalid login length. Maximum 15 characters'),
	password: yup
		.string()
		.required('Enter password')
		.matches(
			/^[\w#%]+$/,
			'Invalid characters in password. Accepted characters: letters, numbers, #, % only.',
		)
		.min(6, 'nvalid password length. Minimum 6 characters')
		.max(30, 'nvalid password length. Maximum 30 characters'),
	passcheck: yup
		.string()
		.required('Fill in repeat password')
		.oneOf([yup.ref('password'), null], 'Passwords mismatch'),
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
			<H2>Registration</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Login"
					{...register('login', {
						onchange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Password"
					{...register('password', {
						onchange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Check password"
					{...register('passcheck', {
						onchange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Register
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
