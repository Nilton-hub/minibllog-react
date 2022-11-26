import styles from './Post.module.css';
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
	const { id } = useParams();
	const { document: post } = useFetchDocument("posts", id);
	return (
		<article className={styles.post_container}>
			{post && (
				<>
					<h1>{post.title}</h1>
					<img src={post.image} title={post.title} />
					<p>{post.body}</p>
					<div className={styles.tags}>
						{post.tagsArray.map(tag => (
							<p key={tag}><span>#</span>{tag}</p>
						))}
					</div>
				</>
			)}
		</article>
	);
};

export default Post;
