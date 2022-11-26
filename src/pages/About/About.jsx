import styles from './About.module.css';
import { Link } from 'react-router-dom';

const About = () => {
	return (
		<main className={styles.about}>
			<h2>Sobre o Mini Blog</h2>
			<p>
				Este projeto consiste em um blog criado criado com react front-end
				e firebase no back-end.
			</p>
			<Link to="/post/create" className="btn">Criar Post</Link>
		</main>
	);
};

export default About;
