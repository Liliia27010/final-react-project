import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{display: 'flex', justifyContent: 'space-between', padding: '1rem 5%', background: '#111', color: 'white'}}>
      <Link to="/" style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'white', textDecoration: 'none'}}>LP</Link>
      <ul style={{display: 'flex', gap: '20px', listStyle: 'none'}}>
        <li><a href="#skills" style={{color: 'white', textDecoration: 'none'}}>Skills</a></li>
        <li><a href="#projects" style={{color: 'white', textDecoration: 'none'}}>Projects</a></li>
        <li><Link to="/form" style={{color: '#007bff', textDecoration: 'none', fontWeight: '500'}}>Form</Link></li>
        <li><Link to="/submissions" style={{color: '#28a745', textDecoration: 'none', fontWeight: '500'}}>Submissions</Link></li>
      </ul>
    </nav>
  );
}