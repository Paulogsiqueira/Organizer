import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { userLogin } from '@/methods/user/userMethods';
import { loginUser } from '@/redux/sliceUser'
import { useDispatch } from 'react-redux'
import { cleanMessage } from '@/methods/others/othersMethods';
import { useNavigate } from 'react-router-dom';
import '../../style/login/Login.sass'

const Login = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async () => {
        const msg = await userLogin(getValues('email'), getValues('password'))
        if (typeof msg === 'object') {
            dispatch(loginUser({ idUser: msg.idUser, accessLevel: msg.accessLevel }))
            setMessage("Usuário logado com sucesso!")
            navigate("/dashboard")
        } else {
            setMessage("Usuário inválido!")
        }
        cleanMessage(setMessage, '', 2000)
    }

    return (
        <div className='login-page'>
            <div className='login-text'>
                <h2>Login</h2>
                <p>Entre com sua conta para gerenciar suas atividades</p>
            </div>
            <form className='login-form' onSubmit={handleSubmit(handleLogin)}>

                <label className='login-label'>
                    <div className='login-input'>
                        <div className='details-input'>
                            <p>Email</p>
                            <input type="text" placeholder='Digite seu email' {...register("email", { required: true, pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.email?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.email?.type == 'pattern' && <p >Email inválido</p>}
                        </div>
                    </div>
                </label>

                <label className='login-label'>
                    <div className='login-input'>
                        <div className='details-input'>
                            <p>Senha</p>
                            <input type="password" placeholder='Digite sua senha' {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.password?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.password?.type == 'pattern' && <p >A senha deve conter letras e números e pelo menos 6 caracteres</p>}
                        </div>
                    </div>
                </label>

                <p className={`${message == "Usuário logado com sucesso!" ? 'message-success' : 'message-error'}`}>{message}</p>
                <button className='btn-login' type="submit">Login</button>
            </form >
            <div className='login-sugestion'>
                <h3>Sugestão de Login</h3>
                <p>As credenciais abaixo dão acesso a um usuário com nível de acesso superior, disponibilizando algumas funcionalidades adicionais</p>
                <div className='login-credentials'>
                    <p>Email: wallace@hotmail.com</p>
                    <p>Senha: 123123q</p>
                </div>
            </div>
        </div>
    )
}

export default Login