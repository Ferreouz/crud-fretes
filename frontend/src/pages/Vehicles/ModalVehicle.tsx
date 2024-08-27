import { useState, SyntheticEvent, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { IVehicleType } from '../../types';
import { PropsModalVehicle } from './types';
import * as api from "../../hooks/Vehicle";

function ModalVehicle({ opened, closeModal, operation, addVehicle, editVehicle, vehicle }: PropsModalVehicle) {
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [vehicleTypes, setVehicleTypes] = useState<IVehicleType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await api.getVehicleTypes();
            setVehicleTypes(data);
        };
        fetchData();
    }, []);

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();

        const item = {
            plate: vehiclePlate || vehicle?.plate || "",
            name: name || vehicle?.name || "",
            type: type || vehicle?.type || "",
        }
        switch (operation) {
            case "create":
                addVehicle(item)
                break;
            case "update":
                editVehicle(item, vehicle?.plate || "")
                break;
            default:
                break;
        }
    }
    function close() {
        setVehiclePlate('');
        setType('');
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
                            <Form.Label >Nome do veículo</Form.Label>
                            <Form.Control
                                value={name || vehicle?.name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Row>
                        <br />
                        <Row>
                            <Form.Label >Placa</Form.Label>
                            <Form.Control
                                value={vehiclePlate || vehicle?.plate}
                                type="text"
                                onChange={(e) => setVehiclePlate(e.target.value)}
                            />
                        </Row>
                        <br />
                        <Row>
                            <Form.Label >Tipo</Form.Label>
                            <Form.Select value={vehicle?.type} onChange={(e) => setType(e.target.value)}>
                                <option>Selecionar</option>
                                {vehicleTypes?.map((item: IVehicleType) => (
                                    <option key={item.name} value={item.name} >{item.name} (Peso: {item.weight})</option>
                                ))}
                            </Form.Select>
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