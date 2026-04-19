import { Link } from 'react-router-dom'; 

const Sidebar = () => (
  <div style={{ width: '250px', background: '#2c3e50', color: 'white', height: '100vh', padding: '20px' }}>
    <h2>Usuário</h2> 
    <nav>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/cadastrar" style={{ color: 'white', textDecoration: 'none' }}>
            Cadastrar Metas
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Visualizar Metas
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;