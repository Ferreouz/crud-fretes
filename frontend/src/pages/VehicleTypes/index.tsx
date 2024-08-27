import { useState, useEffect } from "react";
import Card from "../../components/MCard";
import { Button } from "react-bootstrap";
import { VehicleType } from "../../types";
import * as api from "../../hooks/Vehicle";
import MNavbarCompany from "../../components/MNavbarCompany";
import { Col } from 'react-bootstrap';
import ModalVehicleType from "./ModalVehicleType";
import { PropsModalVehicleType } from "./types";

function Home() {
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [vehicleForEdition, setVehicleForEdition] = useState<VehicleType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getVehicleTypes();
      setVehicleTypes(data);
    };
    fetchData();
  }, []);

  async function update(newVehicle: VehicleType, oldName: string) {
    const res = await api.updateVehicleType(newVehicle, oldName)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar atualizar o tipo do veiculo, por favor, tente novamente")
      return;
    }
    setVehicleTypes(await api.getVehicleTypes());
  }

  async function add(newVehicle: VehicleType) {
    const res = await api.createVehicleType(newVehicle)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar criar o tipo do veiculo, por favor, tente novamente")
      return;
    }
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
    setVehicleTypes(await api.getVehicleTypes());
  }


  return (
    <>
      <MNavbarCompany />
      <div className="container">
        <ModalVehicleType opened={showModal} closeModal={() => setModalState(false)} vehicle={vehicleForEdition}
          addVehicle={(newVehicle: VehicleType) => add(newVehicle)}
          editVehicle={(newVehicle: VehicleType, oldPlate: string) => update(newVehicle, oldPlate)}
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
            {vehicleTypes?.map((item: VehicleType) => (
              <Col key={item.name}>
                <Card
                  key={item.name}
                  title={"Veículo: " + (item.name || "")}
                  subtitle={`PESO: ${item.weight}`}
                  text={[
                  ]}
                  onEdit={() => {
                    setOperation("update");
                    setVehicleForEdition(item);
                    setModalState(true);
                  }}
                  onDelete={() => del(item.name)}
                  canEdit={true}
                  canDelete={true}
                  lastUpdate={item.updated_at}
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