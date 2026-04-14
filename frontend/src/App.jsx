import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import FormPage from './pages/FormPage';
import SubmissionsPage from './pages/SubmissionsPage';
import './index.css';

function HomePage() {
  return (
    <main>
      <Hero />
      <Skills />
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
        </Routes>
        <footer style={{textAlign: 'center', padding: '2rem', color: '#888'}}>
          © 2026 Liliia
        </footer>
      </div>
    </Router>
  );
}

export default App;