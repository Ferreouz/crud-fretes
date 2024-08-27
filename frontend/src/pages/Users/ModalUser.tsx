import { useState, SyntheticEvent } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { PropsModalUser } from './types';
import { IUser } from '../../types';

function ModalVehicle({ opened, closeModal, operation, addUser, editUser, user }: PropsModalUser) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        const item = {
            name: name || user?.name || "",
            email,
            password,
        }
        switch (operation) {
            case "create":
                addUser(item as IUser)
                break;
            case "update":
                editUser(item as IUser, user?.id || 0)
                break;
            default:
                break;
        }
        close();
    }
    function close() {
        setName('');
        setEmail('');
        setPassword('');
        closeModal();
    }
    return (
        <>
            <Modal show={opened} onHide={close}>
                <Form onSubmit={(event) => handleSubmit(event)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {operation == "update" ? "Editar" : "Criar"} Freight
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Label >Nome</Form.Label>
                            <Form.Control
                                value={name || user?.name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Row>
                        <br />
                        <Row>
                            <Form.Label >Email</Form.Label>
                            <Form.Control
                                value={email || user?.email}
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Row>
                        <br />
                        <Row>
                            <Form.Label >Senha</Form.Label>
                            <Form.Control
                                value={password || ""}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={close}>
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            {operation == "update" ? "Salvar" : "Criar"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
export default ModalVehicle