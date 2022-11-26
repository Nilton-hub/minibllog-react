import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, doc, getDoc } from 'firebase/firestore';

export const useFetchDocument = (docCollection, id) => {
	const [document, setDocument] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [cancelled, setCancelled] = useState(null);

	useEffect(() => {
		async function loadDcoument() {
			if (cancelled) return;
			setLoading(true);
			try {
				const docRef = await doc(db, docCollection, id);
				const docSnap = await getDoc(docRef);
				setDocument(docSnap.data());
				setLoading(false);
			} catch (error) {
				setError(error.message);
				console.error(error);
				setLoading(false);
			}
		}
		loadDcoument();
	},[document, id, cancelled]);
	useEffect(() => setCancelled(true), []);
	return { document, loading, error };
};
