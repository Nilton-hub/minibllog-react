import styles from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [body, setBody] = useState('');
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState('');
	const navigate = useNavigate();
	const { user } = useAuthValue();
	const { insertDocument, response } = useInsertDocument("posts");
	const handleSubmit = e => {
		e.preventDefault();
		setFormError("");
		// validate image URL
		try {
			new URL(image);
		} catch (error) {
			setFormError("A imagem precisa ser uma URL.");
		}
		// create the array of tags
		const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());
		// Check all values
		if (!title || !image || !body) {
			setFormError("Preencha todos os campos.");
		}
		if (formError) return;
		insertDocument({title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName});
		e.target.reset();
		console.log(e.target);
		alert('Cadastrado com sucesso');
		navigate('/');
	}
	return (
		<main className={styles['create-post']}>
			<h2>Criar Post</h2>
			<p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Título: </span>
					<input type="text" name="title" required placeholder="Pense num bom título..." onChange={({ target }) => setTitle(target.value)} value={title} />
				</label>
				<label>
					<span>URL da imagem: </span>
					<input type="text" name="image" required placeholder="Insira uma imagem que representa o seu post" onChange={({ target }) => setImage(target.value)} value={image} />
				</label>
				<label className={styles['span-content']}>
					<span>Conteúdo: </span><br />
					<textarea name="body"
						required
						placeholder="Insira o conteúdo do post"
						onChange={({ target }) => setBody(target.value)}
						value={body}
						rows="5"
						cols="50"
					></textarea>
				</label>
				<label>
					<span>Tags: </span>
					<input type="text" name="tags" required placeholder="Insira as tags separadas por virgulas" onChange={({ target }) => setTags(target.value)} value={tags} />
				</label>
				{!response.loading && <button type="susbmit" className="btn">Postar</button>}
				{response.loading && <button type="susbmit" className="btn" disabled>Carregando...</button>}
				{response.error && <p className="error">{response.error}</p>}
				{formError && <p className="error" style={{zIndex: 10}}>{formError}</p>}
			</form>
		</main>
	)
};

export default CreatePost;
