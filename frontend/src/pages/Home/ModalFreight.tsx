import { useState, SyntheticEvent, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Vehicle } from '../../types';
import { getVehicles } from '../../hooks/vehicle';
import { PropsModalFreight } from './types';

function ModalFreight({ opened, closeModal, operation, addFreight, editFreight, freight }: PropsModalFreight) {
  const [productName, setProductName] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [distance, setDistance] = useState(0);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVehicles();
      setVehicles(data);
    };
    fetchData();
  }, []);

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const choosenVehicle = vehicles.filter((item) => item.plate == vehiclePlate).pop() as Vehicle;
    switch (operation) {
      case "create":
        addFreight({productName, vehicle: choosenVehicle, distance})
        break;
      case "update":
        editFreight({
          productName: productName || freight?.productName, 
          vehicle: choosenVehicle || freight?.vehicle, 
          distance: distance || freight?.distance, 
          id: freight?.id
        })
        break;
      default:
        break;
    }
    setProductName('');
    setVehiclePlate('');
    setDistance(0);
    closeModal();
  }
  return (
    <>
      <Modal show={opened} onHide={closeModal}>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {operation == "update" ? "Editar" : "Criar"} Freight
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Form.Label >Nome do produto</Form.Label>
              <Form.Control
                value={productName||freight?.productName}
                type="text"
                onChange={(e) => setProductName(e.target.value)}
              />
            </Row>
            <br />

            <Row>
              <Form.Label >Veiculo</Form.Label>
              <Form.Select  onChange={(e) => setVehiclePlate(e.target.value)}>
                <option>Selecionar</option>
                {vehicles?.map((item: Vehicle) => (
                  <option value={item.plate} selected={freight?.vehicle?.plate == item.plate}>{item.plate} {item.name}</option>
                ))}
              </Form.Select>
            </Row>
                <br />
            <Row>
              <Form.Label >Distância (em Km)</Form.Label>
              <Form.Control
                value={freight?.distance}
                type="number"
                onChange={(e) => setDistance(Number(e.target.value))}
              />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
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

export default ModalFreight