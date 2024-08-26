import { useState, useEffect } from "react";
import Card from "../../components/MCard";
import { Button } from "react-bootstrap";
import { Freight } from "../../types";
import { getFreights } from "../../hooks/Freight";
import ModalFreight from "./ModalFreight";
import { PropsModalFreight } from "./types";

function Home() {
  const [freights, setFreights] = useState<Freight[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [freightEdit, setFreightEdit] = useState<Freight>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFreights();
      setFreights(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <ModalFreight opened={showModal} closeModal={() => setModalState(false)} freight={freightEdit}
        addFreight={(newFreight: Freight) => setFreights(freights.push(newFreight) ? freights : freights)}
        editFreight={(newFreight: Freight) => {
          for (let index = 0; index < freights.length; index++) {
            const element = freights[index];
            if(element.id && element.id == newFreight.id ){
              Object.assign(freights[index],newFreight);
            }            
          }
        }}
        operation={operation as PropsModalFreight["operation"]}
      />
      <div className="row">
        <h3 className="col-6">Todos os Fretes</h3>
        <div className=" col-md-3 offset-md-3">
          <Button variant="primary" onClick={() => {
            setOperation("create");
            setFreightEdit({});
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
              title={item.productName || ""}
              subtitle={"R$" + item.price}
              text={[`Veículo: ${item.vehicle?.plate}`, `Status: ${item.opened ? "Aberto" : "Aguardando Motorista"}`]}
              onEdit={() => {
                setOperation("update");
                setFreightEdit(item);
                setModalState(true);
              }}
              onDelete={() => { }}
              canEdit={item.opened == true}
              canDelete={item.opened == true}
              lastUpdate={item.updated_at}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;