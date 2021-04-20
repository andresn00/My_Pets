import { useState, useContext } from "react";
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { UserContext } from '../Providers/UserProvider'
import { auth } from '../firebase'

const NavBar = () => {
    const [expanded, setExpanded] = useState(false)

    const { user, userLoaded } = useContext(UserContext)
    console.log('navbar user', user)
    // const { isVet, name, email } = user || {}

    return (
        <Navbar expanded={expanded}
            onToggle={() => setExpanded(!expanded)} expand="lg"
            bg="dark" variant="dark">
            <Navbar.Brand href="/home">My Pets</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onClick={() => {
                    setExpanded(false)
                }}>
                    <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
                    {user && (user.isVet ?
                        <Nav.Link as={Link} to="/usuarios">Usuarios</Nav.Link> :
                        <Nav.Link as={Link} to={`/carnets/${user.uid}`}>Carnets</Nav.Link>
                    )}
                </Nav>
                <Nav onClick={() => { setExpanded(false) }}>
                    {!user && userLoaded ? <>
                    <Nav.Link as={Link} to="/signIn">Iniciar Sesión</Nav.Link>
                    <Nav.Link as={Link} to="/signUp">Registrarse</Nav.Link>
                    </> : <>
                        <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                        <Nav.Link onClick={() => auth.signOut()}>Sign out</Nav.Link>    
                    </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
