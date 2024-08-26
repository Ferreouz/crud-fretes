import './App.css'
import Login from './pages/Login'
import { Route, Routes } from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import Home from './pages/Home';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
});

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Fretes</Nav.Link>
            <Nav.Link onClick={() => navigate("/veiculos")}>Veiculos</Nav.Link>
            <Nav.Link onClick={() => navigate("/usuarios")}>Usuarios</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className='container'>
        <AuthProvider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth fallbackPath="/login">
                  <Home />
                </RequireAuth>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
