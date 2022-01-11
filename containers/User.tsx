import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { UserRequest } from "../types/UserRequest";
import { UserResponse } from "../types/UserResponse";

type UserProps = {
    setToken(s: string) : void
}

export const User : NextPage<UserProps> = ({setToken}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setError] = useState('');

    const doUser = async () => {
        try {
            if (name == "" || email == "" || password == "" ) {
                setError('favor preencher os dados');
                return;
            }

            setError('');

            const body = {
                name,
                email,
                password

            };

            const result = await executeRequest('user', 'POST', body);
            if(result && result.data){
                const userResponse = result.data as UserResponse;
                localStorage.setItem('accessToken',userResponse.token);
                localStorage.setItem('userName', userResponse.name);
                localStorage.setItem('userEmail',userResponse.email);
                setToken(userResponse.token);
            }
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
                setError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar o Cadastro, tente novamenete');
        }
    }

    return (
        <div className="container-user">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {msgError && <p>{msgError}</p>}
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu nome" />
                    <input type="text" placeholder="Informe seu nome"
                        value={name} onChange={evento => setName(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email" />
                    <input type="text" placeholder="Informe seu email"
                        value={email} onChange={evento => setEmail(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha" />
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button onClick={doUser}>Cadastrar</button>
            </div>

        </div>
    )
    
}