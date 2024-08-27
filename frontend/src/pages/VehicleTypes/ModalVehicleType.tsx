import { useState, SyntheticEvent } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { PropsModalVehicleType } from './types';

function ModalVehicle({ opened, closeModal, operation, addVehicle, editVehicle, vehicle }: PropsModalVehicleType) {
    const [name, setName] = useState("");
    const [weight, setWeight] = useState(0);

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        const item = {
            weight: weight || vehicle?.weight || 1,
            name: name || vehicle?.name || "",
        }
        switch (operation) {
            case "create":
                addVehicle(item)
                break;
            case "update":
                editVehicle(item, vehicle?.name || "")
                break;
            default:
                break;
        }
    }
    function close() {
        setWeight(0);
        setName('');
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
                            <Form.Label >Nome do tipo de veículo</Form.Label>
                            <Form.Control
                                value={name || vehicle?.name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Row>
                        <br />
                        <Row>
                            <Form.Label >Peso</Form.Label>
                            <Form.Control
                                value={weight || vehicle?.weight}
                                type="number"
                                onChange={(e) => setWeight(Number(e.target.value))}
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