import { useState, SyntheticEvent, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Vehicle } from '../../types';
import { getVehicles } from '../../hooks/Vehicle';
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
    const item = {
      product_name: productName || freight?.product_name,
      vehicle_plate: choosenVehicle?.plate || freight?.vehicle?.plate,
      distance: distance || freight?.distance,
      id: freight?.id
    }

    switch (operation) {
      case "create":
        addFreight(item)
        break;
      case "update":
        editFreight(item)
        break;
      default:
        break;
    }
    close();
  }
  function close() {
    setProductName('');
    setVehiclePlate('');
    setDistance(0);
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
              <Form.Label >Nome do produto</Form.Label>
              <Form.Control
                value={productName || freight?.product_name}
                type="text"
                onChange={(e) => setProductName(e.target.value)}
              />
            </Row>
            <br />

            <Row>
              <Form.Label >Veiculo</Form.Label>
              <Form.Select value={freight?.vehicle?.plate} onChange={(e) => setVehiclePlate(e.target.value)}>
                <option>Selecionar</option>
                {vehicles?.map((item: Vehicle) => (
                  <option key={item.plate} value={item.plate} >{item.plate} {item.name}</option>
                ))}
              </Form.Select>
            </Row>
            <br />
            <Row>
              <Form.Label >Distância (em Km)</Form.Label>
              <Form.Control
                value={distance || freight?.distance}
                type="number"
                onChange={(e) => setDistance(Number(e.target.value))}
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

export default ModalFreight