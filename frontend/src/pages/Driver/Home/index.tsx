import { useState, useEffect } from "react";
import Card from "../../../components/MCard";
import { IFreight } from "../../../types";
import { getFreights } from "../../../hooks/Freight";
import MNavbar from "../../../components/MNavbarDriver";
import { Col } from 'react-bootstrap';
function Home() {
  const [freights, setFreights] = useState<IFreight[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFreights();
      setFreights(data);
    };
    fetchData();
  }, []);

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
                <Card
                  key={item.id}
                  title={"Produto: " + (item.product_name || "")}
                  subtitle={"R$" + item.price + ` + ${item.rate} (taxa)`}
                  text={[
                    `Veículo: ${item.vehicle?.plate} ${item.distance}Km`,
                    `Status: ${item.open ? "Aberto" : "Aguardando Motorista"}`,
                  ]}
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