import { db } from '../firebase/config.jsx';
import {
	getAuth,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	createUserWithEmailAndPassword
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthenticate = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	// cleanup - deal with memory leak
	const [cancelled, setCancelled] = useState(false);
	const auth = getAuth();
	function checkIfIsCancelled() {
		if (cancelled) {
			return;
		}
	}

	const createUser = async (data) => {
		checkIfIsCancelled();
		setLoading(true);
		setError(null);
		try {
			const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
			await updateProfile(user, { displayName: data.displayName });
			setLoading(false);
			return user;
		} catch (err) {
			let systemErrorMessage;
			if (err.message.includes('Password')) {
				systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.';
			} else if (err.message.includes('email-already')) {
				systemErrorMessage = 'O email informado já está cadastrado.';
			} else {
				systemErrorMessage = 'Erro ao cadastrar. Por favor, tente mais tarde.';
			}
			setError(systemErrorMessage);
			setLoading(false);
		}
	}
	// log aut - sign out
	const logout = () => {
		checkIfIsCancelled();
		signOut(auth);
	};
	// login - sign in
	const login = async (data) => {
		checkIfIsCancelled();
		setLoading(true);
		setError(false);
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			setLoading(false);
		} catch (errorLogin) {
			let systemErrorMessage;
			if (errorLogin.message.includes('user-not-found')) {
				systemErrorMessage = 'Usuário não encontrado.';
			} else if (errorLogin.message.includes('wrong-password')) {
				systemErrorMessage = 'Senha incorreta.';
			} else {
				systemErrorMessage = 'Ocorreu um erro. Por favor, tente mais tarde.';
			}
			setError(systemErrorMessage);
			setLoading(false);
		}
	}
	useEffect(() => setCancelled(true), []);
	return { auth, createUser, error, loading, logout, login };
};
