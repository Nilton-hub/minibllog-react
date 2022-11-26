import styles from './PostsDetails.module.css';
import { Link } from 'react-router-dom';

const PostsDetails = ({ post }) => {
	return (
		<article className={styles.post_detail}>
			<img src={post.image} title={post.title} />
			<h2>{post.title}</h2>
			<p className={styles.createdBy}>{post.createBy}</p>
			<div className={styles.tags}>
				{post.tagsArray.map(tag => (
					<p key={tag}><span>#</span>{tag}</p>
				))}
			</div>
			<Link to={`/post/${post.id}`} className="btn btn-outline">Ler</Link>
		</article>
	);
};

export default PostsDetails;
