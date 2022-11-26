import styles from './Login.module.css';
import { useState, useEffect } from 'react';

import { useAuthenticate } from '../../hooks/useAuthenticate';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const { login, auth, error: loginError, loading } = useAuthenticate();

	const handleSubmit = e => {
		e.preventDefault();
		setError(null);
		const user = {email, password};
		login(user);
	}
	return (
		<main className={styles.login}>
			<h1>Entrar</h1>
			<p>Faça login para poder utilizar o sistema.</p>
			<form onSubmit={handleSubmit}>
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
				{error && <p className="error">{error}</p>}
				{!loading && <button type="submit" className="btn">Entrar</button>}
				{loading && <button type="submit" disabled className="btn">Aguarde...</button>}
			</form>
		</main>
	);
}

export default Login;
