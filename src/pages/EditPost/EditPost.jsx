import styles from './EditPost.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
	const { id } = useParams();
	const { document: post } = useFetchDocument("posts", id);
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [body, setBody] = useState('');
	const [tags, setTags] = useState([]);
	const [formError, setFormError] = useState('');
	const navigate = useNavigate();
	const { user } = useAuthValue();
	const { updateDocument, response } = useUpdateDocument("posts");

	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setBody(post.body);
			setImage(post.image);
			const textTags = post.tagsArray.join(', ');
			setTags(textTags);
		}
	}, [post]);

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
		const data = {title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName};
		updateDocument(id, data);
		e.target.reset();
		alert('Cadastrado com sucesso');
		navigate('/dashboard');
	}
	if (!post) return <p>Carregando...</p>
	if (post)
		return (
			<main className={styles['edit-post']}>
				<h2>Editar Post: {post.title}</h2>
				<p>Altere os dados do post como desejar!</p>
				{post && (
					<form onSubmit={handleSubmit}>
						<label>
							<span>Título: </span>
							<input type="text" name="title" required placeholder="Pense num bom título..." onChange={({ target }) => setTitle(target.value)} value={title} />
						</label>
						<label>
							<span>URL da imagem: </span>
							<input type="text" name="image" required placeholder="Insira uma imagem que representa o seu post" onChange={({ target }) => setImage(target.value)} value={image} />
						</label>
						<p className={styles.title_preview}>Preview da imagem atual:</p>
						<img src={post.image} title={post.title} className={styles.image_preview} />
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
						{!response.loading && <button type="susbmit" className="btn">Editar</button>}
						{response.loading && <button type="susbmit" className="btn" disabled>Carregando...</button>}
						{response.error && <p className="error">{response.error}</p>}
						{formError && <p className="error" style={{zIndex: 10}}>{formError}</p>}
					</form>
				)}
			</main>
		)
};

export default EditPost;
