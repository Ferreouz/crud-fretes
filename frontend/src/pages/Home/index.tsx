import { useState, useEffect } from "react";
import Card from "../../components/MCard";
import { Button } from "react-bootstrap";
import { Freight } from "../../types";
import { createFreight, getFreights, updateFreight, deleteFreight } from "../../hooks/Freight";
import ModalFreight from "./ModalFreight";
import { PropsModalFreight } from "./types";
import MNavbarCompany from "../../components/MNavbarCompany";

function Home() {

  const [freights, setFreights] = useState<Freight[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [freightForEdition, setFreightForEdition] = useState<Freight>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFreights();
      setFreights(data);
    };
    fetchData();
  }, []);

  async function update(newFreight: Freight) {
    if(!await updateFreight(newFreight)) {
      alert("Erro ocorreu ao tentar atualizar o Frete, por favor, tente novamente")
      return;
    }
    setFreights(await getFreights());
  }
  
  async function add(newFreight: Freight) {
    if(!await createFreight(newFreight)) {
      alert("Erro ocorreu ao tentar criar o Frete, por favor, tente novamente")
      return;
    }
    setFreights(await getFreights());
  }

  async function del(id: number | undefined) {
    if(!id) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente APAGAR este Frete?')) {
      return;
    } 
    if(!await deleteFreight(id)) {
      alert("Erro ocorreu ao tentar apagar o Frete, por favor, tente novamente")
      return;
    }
    setFreights(await getFreights());
  }


  return (
    <>
      <MNavbarCompany />
      <div className="container">
        <ModalFreight opened={showModal} closeModal={() => setModalState(false)} freight={freightForEdition}
          addFreight={(newFreight: Freight) => add(newFreight)}
          editFreight={(newFreight: Freight) => update(newFreight)}
          operation={operation as PropsModalFreight["operation"]}
        />
        <div className="row">
          <h3 className="col-6">Todos os Fretes</h3>
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
        <div className="container text-center">
          <div className="row">
            {freights?.map((item: Freight) => (
              <Card
                key={item.id}
                title={item.product_name || ""}
                subtitle={"R$" + item.price}
                text={[`Veículo: ${item.vehicle?.plate}`, `Status: ${item.open ? "Aberto" : "Aguardando Motorista"}`]}
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
            ))}
          </div>
        </div>
      </div>

    </>

  );
}

export default Home;