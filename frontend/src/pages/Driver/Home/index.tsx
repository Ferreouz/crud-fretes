import { useState, useEffect } from "react";
import MCard from "../../../components/MCard";
import { IFreight } from "../../../types";
import MNavbar from "../../../components/MNavbarDriver";
import { Col, Card } from 'react-bootstrap';
import moment from "moment";
import * as api from "../../../hooks/Freight";

function Home() {
  const [freights, setFreights] = useState<IFreight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getFreights();
      setFreights(data);
    };
    fetchData();
  }, []);

  async function requestFreight(id: IFreight["id"]) {
    if (!id) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente solicitar este Frete?')) {
      return;
    }
    const res = await api.requestFreight(id)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar solicitar o Frete, por favor, tente novamente")
      return;
    }
    setFreights(await api.getFreights());
  }
  return (
    <>
      <MNavbar />
      <div className="container">
        <div className="d-flex justify-content-evenly">
          <h3 className="col-3">Fretes disponiveis</h3>
        </div>
        <br />
        <div className="container text-center">
          <div className="row gy-5">
            {freights?.map((item: IFreight) => (
              <Col key={item.id}>
                <MCard
                  key={item.id}
                  title={item.driver_receives ? "Você receberá: R$" + (item.driver_receives) : "erro ao calcular o preço"}
                  subtitle={"Produto: " + (item.product_name || "")}
                  text={[
                    `Veículo: ${item.vehicle?.name}`,
                    `Tipo: ${item.vehicle?.type}`,
                    `${item.distance}Km`,
                  ]}
                  footer={
                    <>
                      <Card.Link className={"btn btn-primary" + (item.driver_id != null || item.driver_requested_at ? " disabled" : "")} onClick={() => requestFreight(item.id)}>Solicitar</Card.Link>
                      <br />
                      {
                        item.driver_requested_at ?
                          item.driver_requested_status == "accepted" ? <small className="text-success">Aceito em {moment(item.updated_at).format("DD/MM HH:mm")}</small> :
                          (item.driver_requested_status == "denied" ? <small className="text-danger">Rejeitado em {moment(item.updated_at).format("DD/MM HH:mm")}</small> :
                            <small className="text-info">Solicitado em: {moment(item.updated_at).format("DD/MM HH:mm")}</small>
                          )
                        : ""
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