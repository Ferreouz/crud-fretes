import { useState, SyntheticEvent } from 'react';
import ModalSignUp from './ModalSignUp';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpened, setModalOpened] = useState(false);

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const fields = {
            email: user,
            senha: password,
        }
        setUser('');
        setPassword('');
        axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/login", fields)
            .then(response => {
                if (response.status == 200) {
                    alert("Logado! Redirecionando...")
                    sessionStorage.setItem('token', response.data.access_token)
                }
                //
            })
            .catch(error => {
                alert(error?.response?.data?.message ? "Erro: " + error.response.data.message : "Um erro inesperado ocorreu, por favor, contate o suporte...");
            })
        console.log("Enviado", user, password)
    }

    return (
        <div className='container'>
            <h2>
                Página de Login
            </h2>
            <form onSubmit={handleSubmit}>
                <h3>Acesse o sistema</h3>
                <div>
                    <input type="email" placeholder='Seu Email' onChange={(e) => setUser(e.target.value)} />
                </div>
                <div>
                    <input type="password" placeholder='Sua Senha' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <button>Entrar</button>
            </form>

            <div className="signup">
                <p>
                    Não tem uma conta? <a onClick={() => setModalOpened(true)}>Clique aqui</a>
                </p>
            </div>
            <ModalSignUp opened={modalOpened} closeModal={() => setModalOpened(false)} />
        </div>
    )
}

export default Login
