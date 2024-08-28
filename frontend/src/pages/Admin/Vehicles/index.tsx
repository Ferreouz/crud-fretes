import { useState, useEffect } from "react";
import MCard from "../../../components/MCard";
import { Button } from "react-bootstrap";
import { IVehicle } from "../../../types";
import * as api from "../../../hooks/Vehicle";
import MNavbarCompany from "../../../components/MNavbarAdmin";
import { Col, Card } from 'react-bootstrap';
import ModalVehicle from "./ModalVehicle";
import { PropsModalVehicle } from "./types";
import moment from "moment";
function Home() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [vehicleForEdition, setVehicleForEdition] = useState<IVehicle>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getVehicles();
      setVehicles(data);
    };
    fetchData();
  }, []);

  async function update(newVehicle: IVehicle, oldPlate: string) {
    const res = await api.updateVehicle(newVehicle, oldPlate)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar atualizar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setVehicles(await api.getVehicles());
  }

  async function add(newVehicle: IVehicle) {
    const res = await api.createVehicle(newVehicle)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar criar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setVehicles(await api.getVehicles());
  }

  async function del(plate: string) {
    if (!plate) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente APAGAR este Frete?')) {
      return;
    }
    const res = await api.deleteVehicle(plate);
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar apagar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setVehicles(await api.getVehicles());
  }


  return (
    <>
      <MNavbarCompany />
      <div className="container">
        <ModalVehicle opened={showModal} closeModal={() => setModalState(false)} vehicle={vehicleForEdition}
          addVehicle={(newVehicle: IVehicle) => add(newVehicle)}
          editVehicle={(newVehicle: IVehicle, oldPlate: string) => update(newVehicle, oldPlate)}
          operation={operation as PropsModalVehicle["operation"]}
        />
        <div className="d-flex justify-content-evenly">
          <h3 className="col-3">Veículos</h3>
          <div className=" col-md-3 offset-md-3">
            <Button variant="primary" onClick={() => {
              setOperation("create");
              setVehicleForEdition(undefined);
              setModalState(true);
            }}>
              Adicionar
            </Button>
          </div>
        </div>
        <br />
        <div className="container text-center">
          <div className="row gy-5">
            {vehicles?.map((item: IVehicle) => (
              <Col key={item.plate}>
                <MCard
                  key={item.plate}
                  title={"Veículo: " + (item.name || "")}
                  subtitle={`PLACA: ${item.plate}`}
                  text={[
                    `Tipo: ${item.type}`,
                  ]}
                  footer={
                    <>
                      <Card.Link className="btn btn-danger" onClick={() => del(item.plate)}>Apagar</Card.Link>
                      <Card.Link className="btn"
                        onClick={() => {
                          setOperation("update");
                          setVehicleForEdition(item);
                          setModalState(true);
                        }}>Editar</Card.Link>
                      <br />
                      <small className="text-info">Última alteração {moment(item.updated_at).format("DD/MM HH:mm")}</small>
                    </>
                  }
                />
              </Col>
            ))}
          </div>
        </div>
      </div>

    </>

  );
}

export default Home;