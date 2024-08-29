import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { downloadReport } from '../../hooks/downloadReport';
function MNavbarAdmin() {
    const navigate = useNavigate();
    return (
        <>
            <Navbar sticky='top' expand="lg" className="primary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/")}>Fretes</Nav.Link>
                            <Nav.Link onClick={() => navigate("/veiculos")}>Veiculos</Nav.Link>
                            <Nav.Link onClick={() => navigate("/veiculos-tipos")}>Tipos de Veiculo</Nav.Link>
                            <Nav.Link onClick={() => navigate("/usuarios")}>Usuarios</Nav.Link>
                            <Nav.Link onClick={async () => {
                                    await downloadReport()
                            }} >Baixar relatório de ontem</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MNavbarAdmin
