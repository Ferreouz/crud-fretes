import Modal from '../../components/Modal';
import truck from "../../assets/truck.png";
import { useState, SyntheticEvent } from 'react';
import "./ModalSignUp.css";
import axios from 'axios';

interface PropsModalSignUp {
  opened: boolean,
  closeModal: () => void
}

function ModalSignUp({ opened, closeModal }: PropsModalSignUp) {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const fields = {
      nome: name,
      email: user,
      senha: password,
      userType
    }
    setUser('');
    setName('');
    setPassword('');
    setUserType('');
    axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/register", fields)
      .then(response => {
        if (response.status == 200) {
          alert("Cadastro concluido! Redirecionando...")
          sessionStorage.setItem('token', response.data.access_token)
        }
        //
      })
      .catch(error => {
        alert(error?.response?.data?.message ? "Erro: " + error.response.data.message : "Um erro inesperado ocorreu, por favor, contate o suporte...");
      })
    closeModal()
  }

  return (
    <Modal title='Cadastrar' opened={opened} closeModal={closeModal}>
      <div className='modal-body'>
        <figure >
          <img src={truck} alt="" />
        </figure>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder='Seu Nome' onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <input type="email" placeholder='Seu Email' onChange={(e) => setUser(e.target.value)} />
          </div>
          <div>
            <input type="password" placeholder='Uma Senha' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <select onChange={(e) => setUserType(e.target.value)}>
              <option value="">Selecione</option>
              <option value="empresa">Empresa</option>
              <option value="entregador">Entregador</option>
            </select>
          </div>
          <br />
          <button>Cadastrar</button>
        </form>
      </div>
    </Modal>
  )
}

export default ModalSignUp