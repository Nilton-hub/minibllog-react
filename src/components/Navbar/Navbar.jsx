import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuthenticate } from '../../hooks/useAuthenticate';
import { useAuthValue } from '../../context/AuthContext';

const Navbar = () => {
	const { user } = useAuthValue();
	const { logout } = useAuthenticate();
	
	return (
		<nav className={styles.navbar}>
			<NavLink to="/" className={styles.brand}>Mini <span>Blog</span></NavLink>
			<ul className={styles.list_links}>
				<li><NavLink to="/">Home</NavLink></li>
				<li><NavLink to="/sobre">Sobre</NavLink></li>
				{!user && (
					<>
						<li><NavLink to="/login">Login</NavLink></li>
						<li><NavLink to="/cadastrar">Cadastrar</NavLink></li>
					</>
				)}
				{user && (
					<>
						<li><NavLink to="/post/create">Novo Post</NavLink></li>
						<li><NavLink to="/dashboard">dashboard</NavLink></li>
					</>
				)}
				{user && (
					<li>
						<button onClick={logout}>Sair</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
