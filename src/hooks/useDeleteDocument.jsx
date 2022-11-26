import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

const initialState = {
	loading: null,
	error: null
};

const deleteReducer = (state, action) => {
	switch(action.type) {
		case "LOADING":
			return {loading: true, error: null};
		break;

		case "DELETED_DOC":
			return {loading: false, error: null};
		break;

		case "ERROR":
			return {error: false, error: action.payload};
		break;
		default:
			return state;
	}
};

export const useDeleteDocument = (docCollection) => {
	const [response, dispatch] = useReducer(deleteReducer, initialState);
	// deal with memory leak
	const [cancelled, setCancelled] = useState(false);
	const checkCancelledBeforeDispatch = (action) => {
		if (!cancelled) dispatch(action);
	};
	const deleteDocument = async (id) => {
		checkCancelledBeforeDispatch({
			type: "LOADING"
		});
		try {
			const deletedDocument = await deleteDoc(doc(db, docCollection, id));
			checkCancelledBeforeDispatch({
				"type": "DELETED_DOC",
				payload: deletedDocument
			});
		} catch (error) {
			checkCancelledBeforeDispatch({
				type: "ERROR",
				payload: error.message
			});
		}
	};
	useEffect(() => setCancelled(true), []);
	return { deleteDocument, response };
};
