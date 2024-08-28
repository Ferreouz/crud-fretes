import { useState, useEffect } from "react";
import MCard from "../../../components/MCard";
import { Button } from "react-bootstrap";
import { IVehicleType } from "../../../types";
import * as api from "../../../hooks/Vehicle";
import MNavbarCompany from "../../../components/MNavbarAdmin";
import { Col, Card } from 'react-bootstrap';
import ModalVehicleType from "./ModalVehicleType";
import { PropsModalVehicleType } from "./types";
import moment from "moment";
function Home() {
  const [vehicleTypes, setVehicleTypes] = useState<IVehicleType[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [vehicleForEdition, setVehicleForEdition] = useState<IVehicleType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getVehicleTypes();
      setVehicleTypes(data);
    };
    fetchData();
  }, []);

  async function update(newVehicle: IVehicleType, oldName: string) {
    const res = await api.updateVehicleType(newVehicle, oldName)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar atualizar o tipo do veiculo, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setVehicleTypes(await api.getVehicleTypes());
  }

  async function add(newVehicle: IVehicleType) {
    const res = await api.createVehicleType(newVehicle)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar criar o tipo do veiculo, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setVehicleTypes(await api.getVehicleTypes());
  }

  async function del(name: string) {
    if (!name) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente APAGAR este tipo de Veiculo?')) {
      return;
    }
    const res = await api.deleteVehicleType(name);
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar apagar o tipo do veiculo, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setVehicleTypes(await api.getVehicleTypes());
  }


  return (
    <>
      <MNavbarCompany />
      <div className="container">
        <ModalVehicleType opened={showModal} closeModal={() => setModalState(false)} vehicle={vehicleForEdition}
          addVehicle={(newVehicle: IVehicleType) => add(newVehicle)}
          editVehicle={(newVehicle: IVehicleType, oldPlate: string) => update(newVehicle, oldPlate)}
          operation={operation as PropsModalVehicleType["operation"]}
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
            {vehicleTypes?.map((item: IVehicleType) => (
              <Col key={item.name}>
                <MCard
                  key={item.name}
                  title={"Veículo: " + (item.name || "")}
                  subtitle={`PESO: ${item.weight}`}
                  text={[
                  ]}
                  footer={
                    <>
                      <Card.Link className="btn btn-danger" onClick={() => del(item.name)}>Apagar</Card.Link>
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