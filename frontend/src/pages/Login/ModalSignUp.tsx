import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

interface PropsModalSignUp {
  opened: boolean,
  closeModal: () => void,
  onLogin: () => Promise<void>,
}

function ModalSignUp({ opened, closeModal, onLogin }: PropsModalSignUp) {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const fields = {
      name,
      email: user,
      password
    }
    axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/register", fields)
      .then(async response => {
        if (response.status == 200 && response.data.access_token &&
          signIn({
            auth: {
              token: response.data.access_token,
              type: 'Bearer'
            },
            userState: {
              email: fields.email,
              //TODO: set user type
            }
          })
        ) {
          await onLogin();
          alert("Cadastro concluido! Redirecionando...")
          closeModal()
          navigate("/")
        }
        //
      })
      .catch(error => {
        alert(error?.response?.data?.error ? "Erro: " + error.response.data.error : "Um erro inesperado ocorreu, por favor, contate o suporte...");
      })
  }

  return (
    <>
      <Modal show={opened} onHide={closeModal}>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Modal.Header closeButton>
            <Modal.Title>Criar cadastro</Modal.Title>
          </Modal.Header>
          <Modal.Body>    
            <Row>
            <Form.Label htmlFor="inputNome">Nome</Form.Label>
            <Form.Control
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              aria-describedby="nameHelp"
            />
            <Form.Text id="nameHelp" muted>
              Seu Nome
            </Form.Text>
          </Row>

            <Row>
              <Form.Label htmlFor="inputEmail">Email</Form.Label>
              <Form.Control
                type="email" placeholder=''
                onChange={(e) => setUser(e.target.value)}
                id="email"
                aria-describedby="emailHelp"
              />
              <Form.Text id="emailHelp" muted>
                Seu Email
              </Form.Text>
            </Row>

            <Row>
              <Form.Label htmlFor="inputPassword">Senha</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                aria-describedby="passwordHelp"
              />
              <Form.Text id="passwordHelp" muted>
                Digite uma senha forte
              </Form.Text>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Criar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default ModalSignUp