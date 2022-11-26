import styles from './Home.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState} from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
// componensts
import PostsDetails from '../../components/PostsDetails/PostsDetails';

const Home = () => {
	const [query, setQuery] = useState("");
	// const [posts, setPosts] = useState([]);
	const {documents: posts, loading } = useFetchDocuments('posts');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query) navigate(`/search?q=${query}`);
	};
	// console.log(PostDetail);
	return (
		<main className={styles.home}>
			<h1>Veja os nossos posts mais recentes</h1>
			<form onSubmit={handleSubmit} className={styles.search_form}>
				<input
					type="search"
					name="search"
					placeholder="Ou busque por tags"
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="btn btn-dark">Pesquisar</button>
			</form>
			<div>
				{loading && <p>Carregando...</p>}
				{posts && posts.map((post, id) => <PostsDetails key={post.id} post={post} />)}
				{posts && posts.length === 0 && (
					<div className={styles.no_posts}>
						<p>Ainda não existem artigos cadastrados</p>
						<Link to="/posts/create" className="btn">Criar o primeiro artigo</Link>
					</div>
				)}
			</div>
		</main>
	);
}

export default Home;
