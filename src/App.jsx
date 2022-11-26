import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './assets/App.css';
import { AuthProvider } from './context/AuthContext';
import { useAuthenticate } from './hooks/useAuthenticate';
// Pages
import Home from './pages/home/Home';
import About from './pages/about/About';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import EditPost from './pages/EditPost/EditPost';
import Login from './pages/login/Login';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthenticate();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/posts/edit/:id" element={!user ? <Login /> : <EditPost />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/cadastrar" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/post/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
