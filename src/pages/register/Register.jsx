import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useAuthenticate } from '../../hooks/useAuthenticate';

const Register = () => {
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');

	const { createUser, error: authError, loading } = useAuthenticate();

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		const user = {
			displayName,
			email,
			password,
			confirmPassword
		};
		if (password !== confirmPassword) {
			setError('As senhas precisam ser iguais');
			return;
		}
		const res = await createUser(user);
		console.log(user);
		console.log(error);
	};

	useEffect(() => {
		setError(authError);
	}, [authError]);

	return (
		<main className={styles.register}>
			<h1>Cadastre-se Para Postar</h1>
			<p>Crie seu usuário e compartilhe a sua história.</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Nome:</span>
					<input type="text" name="name" id="displayName" required placeholder="Nome do usuário"
						value={displayName} onChange={e => setDisplayName(e.target.value)} />
				</label>
				<label>
					<span>E-mail:</span>
					<input type="email" name="email" required placeholder="Email do usuário" 
						value={email} onChange={e => setEmail(e.target.value)}/>
				</label>
				<label>
					<span>Senha:</span>
					<input type="password" name="password" required placeholder="Crie uma senha" 
						value={password} onChange={e => setPassword(e.target.value)}/>
				</label>
				<label>
					<span>confirmação de Senha:</span>
					<input type="password" name="confirmPassword" required placeholder="Repita a sua senha" 
						value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
				</label>
				{error && <p className="error">{error}</p>}
				{!loading && <button type="submit" className="btn">Cadastar</button>}
				{loading && <button type="submit" disabled className="btn">Aguarde...</button>}
			</form>
		</main>
	);
}

export default Register;
