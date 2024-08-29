import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { FreightStatus } from '../../../types';
import { ModalChangeStatusProps } from './types';

function ModalChangeStatus(args: ModalChangeStatusProps) {
    const [status, setStatus] = useState<FreightStatus>(args.freight?.status as FreightStatus);

    function close() {
        args.closeModal();
    }
    return (
        <>
            <Modal show={args.opened} onHide={close}>
                <Form onSubmit={() => args.onSubmit(status)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Mudar status
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Form.Label >Novo status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value as FreightStatus)}>
                            <option  value="Aceito" >Aceito</option>
                            <option  value="Rota de entrega" >Rota de entrega</option>
                            <option  value="Finalizado" >Finalizado</option>
                            </Form.Select>
                        </Row>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={close}>
                            Fechar
                        </Button>
                        <Button variant="primary" type="submit">
                            salvar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
export default ModalChangeStatus