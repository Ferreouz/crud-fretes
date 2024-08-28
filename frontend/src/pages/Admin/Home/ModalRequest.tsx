import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { IFreightRequest } from '../../../types';
import { PropsModalRequest } from './types';
import { Card } from "react-bootstrap";

function ModalRequest({ opened, closeModal, requests, updateFreightRequest }: PropsModalRequest) {


  function close() {
    closeModal();
  }
  return (
    <>
      <Modal show={opened} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            Solicitações de motoristas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            requests?.map((request: IFreightRequest) => (
              <>
                <Row key={request.driver_id}>
                  <Card>
                    <Card.Body className="d-flex justify-content-evenly">
                      {request.driver?.name} ({request.driver?.email})
                      <div>
                        <Card.Link href="#" className="link-success" onClick={() => updateFreightRequest(request.freight_id, request.driver_id, "accepted")}>Aceitar</Card.Link>
                        {
                          request.status == "waiting" ?

                            <Card.Link href="#" className="link-danger" onClick={() => updateFreightRequest(request.freight_id, request.driver_id, "denied")}>Rejeitar</Card.Link>

                            : <Card.Subtitle className="text-danger">Rejeitado</Card.Subtitle>
                        }
                      </div>
                    </Card.Body>
                  </Card>
                </Row>
                <br />
              </>
            ))
          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalRequest