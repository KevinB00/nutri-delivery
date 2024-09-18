import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavLink from 'react-bootstrap/NavLink';
import "./menuUsuario.sass"
const MenuUsuario = () => {
    const urlLogout = "http://nutri-delivery.vercel.app/backend/auth/logout.php";
  const handleLogout = () => {
    fetch(urlLogout);
        document.cookie = "userId=; max-age=0"; // Destroy the cookie userId
        window.location = '/';
  }

  return (
    <Nav>
      <NavDropdown className='usuario-menu' title={<NavLink><i className="bi bi-person-circle" style={{fontSize: "30px", marginRight: "20px"}}></i></NavLink>}>
        <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  )
}

export default MenuUsuario
