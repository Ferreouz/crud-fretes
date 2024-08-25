import { useState, useEffect } from "react";
import Card from "../../components/MCard";
import { Button } from "react-bootstrap";
import {Freight} from "../../types";
import { getFreights } from "../../hooks/Freight";
import ModalFreight from "./ModalFreight";
import { PropsModalFreight } from "./types";

function Home() {
  const [freights, setFreights] = useState<Freight[]>([]);
  const [show, setOpened] = useState(false);
  const [operation, setOperation] = useState('');
  // const [freightEdit, setFreightEdit] = useState<Freight>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFreights();
      setFreights(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <ModalFreight opened={show} closeModal={() => setOpened(false)} 
      addFreight={(newFreight: Freight) => setFreights(freights.push(newFreight) ? freights : freights)}
      editFreight={(newFreight: Freight) =>console.log("Edit: ",newFreight)}
      operation={operation as PropsModalFreight["operation"]}
      />
      <div className="row">
        <h1 className="col-6">Todos os Fretes</h1>
        <div className=" col-md-3 offset-md-3">
          <Button variant="primary" onClick={() => setOpened(true)}>
            Anunciar Frete
          </Button>
        </div>
      </div>
      <div className="container text-center">
        <div className="row">
          {freights?.map((item: Freight) => (
            <Card
              key={item.id}
              title={item.productName}
              subtitle={"R$" + item.price}
              text={[`Veículo: ${item.vehicle.plate}`, `Status: ${item.opened ? "Aberto" : "Aguardando Motorista"}`]}
              onEdit={() => {
                setOperation("update");
              }}
              onDelete={() => {}}
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