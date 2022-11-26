import styles from './Search.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import PostsDetails from '../../components/PostsDetails/PostsDetails';
import { Link } from 'react-router-dom';

const Search = () => {
	const query = useQuery();
	const search = query.get('q');
	const { documents: posts } = useFetchDocuments('posts', search);
	console.log(posts);
	return (
		<main className={styles.search_container}>
			<h1>A sua pesquisa por <span style={{color: "blue"}}>{search}</span></h1>
			<div>
				{posts && posts.length === 0 && (
					<div className="noposts">
						<p>Não foram encontrados artigos apartir da sua busca.</p>
						<Link to="/" className="btn btn-dark">Voltar</Link>
					</div>
				)}
				{posts && posts.map(post => <PostsDetails key={post.id} post={post} />)}
			</div>
		</main>
	);
};

export default Search;
