import { useState, useEffect } from "react";
import Card from "../../../components/MCard";
import { Button } from "react-bootstrap";
import { IFreight } from "../../../types";
import { createFreight, getFreights, updateFreight, deleteFreight } from "../../../hooks/Freight";
import ModalFreight from "./ModalFreight";
import { PropsModalFreight } from "./types";
import MNavbarCompany from "../../../components/MNavbarCompany";
import { Col } from 'react-bootstrap';
function Home() {
  const [freights, setFreights] = useState<IFreight[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [freightForEdition, setFreightForEdition] = useState<IFreight>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFreights();
      setFreights(data);
    };
    fetchData();
  }, []);

  async function update(newFreight: IFreight) {
    const res = await updateFreight(newFreight)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar atualizar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setFreights(await getFreights());
  }

  async function add(newFreight: IFreight) {
    const res = await createFreight(newFreight)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar criar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setFreights(await getFreights());
  }

  async function del(id: number | undefined) {
    if (!id) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente APAGAR este Frete?')) {
      return;
    }
    const res = await deleteFreight(id)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar apagar o Frete, por favor, tente novamente")
      return;
    }
    setModalState(false)
    setFreights(await getFreights());
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
                <Card
                  key={item.id}
                  title={"Produto: " + (item.product_name || "")}
                  subtitle={"R$" + item.price + ` + ${item.rate} (taxa)`}
                  text={[
                    `Veículo: ${item.vehicle?.plate} ${item.distance}Km`,
                    `Status: ${item.open ? "Aberto" : "Aguardando Motorista"}`,
                  ]}
                  onEdit={() => {
                    setOperation("update");
                    setFreightForEdition(item);
                    setModalState(true);
                  }}
                  onDelete={() => del(item.id)}
                  canEdit={item.open == true}
                  canDelete={item.open == true}
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