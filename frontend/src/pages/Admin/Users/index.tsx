import { useState, useEffect } from "react";
import MCard from "../../../components/MCard";
import { Button } from "react-bootstrap";
import { IUser } from "../../../types";
import * as api from "../../../hooks/User";
import MNavbarCompany from "../../../components/MNavbarAdmin";
import { Col, Card } from 'react-bootstrap';
import ModalVehicleType from "./ModalUser";
import { PropsModalUser } from "./types";
import moment from "moment";
function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [showModal, setModalState] = useState(false);
  const [operation, setOperation] = useState('');
  const [userForEdition, setUserForEdition] = useState<IUser>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  async function update(user: IUser, id: number) {
    const res = await api.updateUser(user, id)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar atualizar o usuário, por favor, tente novamente")
      return;
    }
    setUsers(await api.getUsers());
    setModalState(false)
  }

  async function add(user: IUser) {
    const res = await api.createUser(user)
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao criar o usuário, por favor, tente novamente")
      return;
    }
    setUsers(await api.getUsers());
    setModalState(false)
  }

  async function del(id: number) {
    if (!id) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente DESATIVAR este usuário?')) {
      return;
    }
    const res = await api.deleteUser(id);
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar desativar o usuário, por favor, tente novamente")
      return;
    }
    setUsers(await api.getUsers());
    setModalState(false)
  }

  async function unDel(id: number) {
    if (!id) {
      alert("Ocorreu um erro inesperado, por favor, contate o suporte")
      return;
    }
    if (!confirm('Deseja realmente ATIVAR este usuário?')) {
      return;
    }
    const res = await api.unDeleteUser(id);
    if (!res.success) {
      alert(res.error || "Erro ocorreu ao tentar ativar o usuário, por favor, tente novamente")
      return;
    }
    setUsers(await api.getUsers());
    setModalState(false)
  }


  return (
    <>
      <MNavbarCompany />
      <div className="container">
        <ModalVehicleType opened={showModal} closeModal={() => setModalState(false)} user={userForEdition}
          addUser={(user: IUser) => add(user)}
          editUser={(user: IUser, id: number) => update(user, id)}
          operation={operation as PropsModalUser["operation"]}
        />
        <div className="d-flex justify-content-evenly">
          <h3 className="col-3">Usuários</h3>
          <div className=" col-md-3 offset-md-3">
            <Button variant="primary" onClick={() => {
              setOperation("create");
              setUserForEdition(undefined);
              setModalState(true);
            }}>
              Adicionar
            </Button>
          </div>
        </div>
        <br />
        <div className="container text-center">
          <div className="row gy-5">
            {users?.map((item: IUser) => (
              <Col key={item.name}>
                <MCard
                  key={item.name}
                  title={"Nome: " + (item.name || "")}
                  subtitle={`Email: ${item.email}`}
                  text={[
                  ]}
                  footer={
                    <>
                      {
                        item.active ? <Card.Link className="btn btn-danger" onClick={() => del(item.id)}>Desativar</Card.Link> :
                        <Card.Link className="btn btn-success" onClick={() => unDel(item.id)}>Ativar</Card.Link>
                      }
                      
                      <Card.Link className="btn"
                        onClick={() => {
                          setOperation("update");
                          setUserForEdition(item);
                          setModalState(true);
                        }}>Editar</Card.Link>
                      <br />
                      {
                        item.active &&
                        <small className="text-info">Última alteração {moment(item.updated_at).format("DD/MM HH:mm")}</small>
                      }
                      {
                        !item.active &&
                        <small className="text-muted">Desativado em {moment(item.updated_at).format("DD/MM HH:mm")}</small>
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