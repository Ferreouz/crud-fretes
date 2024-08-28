import { useState, useEffect } from "react";
import MCard from "../../../components/MCard";
import { Button } from "react-bootstrap";
import { IFreight, IFreightRequest, DriverRequestStatus } from "../../../types";
import * as api from "../../../hooks/Freight";
import ModalFreight from "./ModalFreight";
import { PropsModalFreight } from "./types";
import MNavbarCompany from "../../../components/MNavbarAdmin";
import { Col } from 'react-bootstrap';
import { Card } from "react-bootstrap";
import moment from "moment";
import ModalRequest from "./ModalRequest";
function Home() {
  const [freights, setFreights] = useState<IFreight[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [freightForEdition, setFreightForEdition] = useState<IFreight>();

  const [showModalRequest, setModalStateRequest] = useState(false);
  const [freightRequests, setfreightRequests] = useState<IFreightRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getFreights();
      setFreights(data);
    };
    fetchData();
  }, []);

  async function update(newFreight: IFreight) {
    const res = await api.updateFreight(newFreight)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar atualizar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setFreights(await api.getFreights());
  }

  async function add(newFreight: IFreight) {
    const res = await api.createFreight(newFreight)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar criar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setFreights(await api.getFreights());
  }

  async function del(id: number | undefined) {
    if (!id) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente APAGAR este Frete?')) {
      return;
    }
    const res = await api.deleteFreight(id)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar apagar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setFreights(await api.getFreights());
  }

  async function updateFreightRequest(freight_id: number, driver_id: number, newStatus: DriverRequestStatus) {
    const res = await api.updateFreightRequest(freight_id, driver_id, newStatus)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar mudar a solicitação do Frete, por favor, tente novamente")
      return;
    }
    setModalStateRequest(false)
    setFreights(await api.getFreights());
  }



  return (
    <>
      <MNavbarCompany />
      <div className="container">
        <ModalFreight opened={showModal} closeModal={() => setModalState(false)} freight={freightForEdition}
          addFreight={(newFreight: IFreight) => add(newFreight)}
          editFreight={(newFreight: IFreight) => update(newFreight)}
          operation={operation as PropsModalFreight["operation"]}
        />
        <ModalRequest opened={showModalRequest} closeModal={() => setModalStateRequest(false)} requests={freightRequests}
          updateFreightRequest={(freight_id: number, driver_id: number, newStatus: DriverRequestStatus) => updateFreightRequest(freight_id, driver_id, newStatus)} />
        <div className="d-flex justify-content-evenly">
          <h3 className="col-3">Todos os Fretes</h3>
          <div className=" col-md-3 offset-md-3">
            <Button variant="primary" onClick={() => {
              setOperation("create");
              setFreightForEdition({});
              setModalState(true);
            }}>
              Anunciar Frete
            </Button>
          </div>
        </div>
        <br />
        <div className="container text-center">
          <div className="row gy-5">
            {freights?.map((item: IFreight) => (
              <Col key={item.id}>
                <MCard
                  key={item.id}
                  title={"Produto: " + (item.product_name || "")}
                  subtitle={"R$" + item.price + ` (${item.rate} de taxa)`}
                  text={[
                    `Veículo: ${item.vehicle?.name} ${item.vehicle?.plate}`,
                    `Distancia: ${item.distance}Km`,
                    `Quantidade de motoristas interessados: ${item.drivers_requests?.filter((req) => req).length || 0}`,
                  ]}
                  footer={
                    <>
                      {
                        item.driver_id == null ?
                          <>
                            <Card.Link className={"btn btn-danger" + (item.driver_id == null ? "" : " disabled")} onClick={() => del(item.id)}>Apagar</Card.Link>
                            <Card.Link className={"btn" + (item.driver_id == null ? "" : " disabled")}
                              onClick={() => {
                                setOperation("update");
                                setFreightForEdition(item);
                                setModalState(true);
                              }}>Editar</Card.Link>
                            {
                              item.drivers_requests?.length != undefined && item.drivers_requests?.length > 0 && item.drivers_requests[0] != null
                                ?
                                <Card.Link className={"btn btn-primary" + (item.driver_id == null ? "" : " disabled")}
                                  onClick={() => {
                                    setfreightRequests(item.drivers_requests || []);
                                    setModalStateRequest(true);
                                  }}>Ver solicitações</Card.Link>
                                : ""
                            }
                            <br />
                            <small className={item.driver_id == null ? "text-info" : "text-success"} >{item.driver_id == null ? "Última alteração" : "Aceito em"} {moment(item.updated_at).format("DD/MM HH:mm")}</small>
                          </>
                          : 
                          <> 
                            <small className="text-info" >Status: {item.status}</small>
                            <br />
                            <small className="text-info" >Última alteração {moment(item.updated_at).format("DD/MM HH:mm")}</small>
                          </>
                      }

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