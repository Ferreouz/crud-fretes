import { useState, SyntheticEvent } from 'react';
import ModalSignUp from './ModalSignUp';
import axios from 'axios';
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [modalOpened, setModalOpened] = useState(false);
    const signIn = useSignIn();
    const navigate = useNavigate();

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        const fields = {
            email: user,
            password,
        }
        setUser('');
        setPassword('');
        axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/login", fields)
            .then(response => {
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
                    alert("Logado! Redirecionando...")
                    navigate("/")
                }
                //
            })
            .catch(error => {
                alert(error?.response?.data?.error ? "Erro: " + error.response.data.error : "Um erro inesperado ocorreu, por favor, contate o suporte...");
            })
        console.log("Enviado", user, password)
    }

    return (
        <>
        <div className='container'>
            <h2>
                Página de Login
            </h2>
            <form onSubmit={handleSubmit}>
                <h3>Acesse o sistema</h3>
                <div>
                    <input type="email" value={user} placeholder='Seu Email' onChange={(e) => setUser(e.target.value)} />
                </div>
                <div>
                    <input type="password" value={password} placeholder='Sua Senha' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <button>Entrar</button>
            </form>

            <div className="signup">
                <p>
                    Não tem uma conta? <a onClick={() => setModalOpened(true)}>Clique aqui</a>
                </p>
            </div>
        </div>
        <div className='container'>
        <ModalSignUp opened={modalOpened} closeModal={() => setModalOpened(false)} />
        </div>
        </>
    )
}

export default Login
