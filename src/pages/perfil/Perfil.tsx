import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useUser } from '@/redux/sliceUser'
import { validForm } from '@/methods/validation/validationMethods';
import { cleanMessage } from '@/methods/others/othersMethods';

const Perfil = () => {
    const { register, handleSubmit, formState: { errors }, getValues} = useForm()
    const [message, setMessage] = useState('')
    const user = useSelector(useUser)

    const handleValid = async ()  => {
       const msg = await validForm(user.idUser,getValues('name'),getValues('email'),getValues('password'),getValues('newPassword'),getValues('confirmNewPassword'))
        setMessage(msg)
        cleanMessage( setMessage,'',2000)
    }

    return (
        <div className='register-page'>
            <div className='register-text'>
                <h2>Perfil</h2>
            </div>
            <form className='register-form' onSubmit={handleSubmit(handleValid)}>
                <label className='register-label'>
                    <div className='register-input'>
                        <div className='details-input'>
                            <p>Nome</p>
                            <input type="text" placeholder='Digite seu nome' defaultValue={user.name} {...register("name", { required: true })} />
                        </div>
                        <div className='details-error'>
                            {errors?.name?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                </label>
                <label className='register-label'>
                    <div className='register-input'>
                        <div className='details-input'>
                            <p>Email</p>
                            <input type="text" placeholder='Digite seu email' defaultValue={user.email} {...register("email", { required: true, pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.email?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.email?.type == 'pattern' && <p >Email inválido</p>}
                        </div>
                    </div>
                </label>
                <label className='register-label'>
                    <div className='register-input'>
                        <div className='details-input'>
                            <p>Senha Atual</p>
                            <input type="password" placeholder='Digite sua senha atual' defaultValue={''} {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.password?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.password?.type == 'pattern' && <p >A senha deve conter letras e números e pelo menos 6 caracteres</p>}
                        </div>
                    </div>
                </label>
                <label className='register-label'>
                    <div className='register-input'>
                        <div className='details-input'>
                            <p>Nova Senha</p>
                            <input type="password" placeholder='Digite sua nova senha' {...register("newPassword", { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.newPassword?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.newPassword?.type == 'pattern' && <p >A senha deve conter letras e números e pelo menos 6 caracteres</p>}
                        </div>
                    </div>
                </label>
                <label className='register-label'>
                    <div className='register-input'>
                        <div className='details-input'>
                            <p>Confirmar Nova Senha</p>
                            <input type="password" placeholder='Digite sua nova senha novamente' {...register("confirmNewPassword", { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.confirmNewPassword?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.confirmNewPassword?.type == 'pattern' && <p >A senha deve conter letras e números e pelo menos 6 caracteres</p>}
                        </div>
                    </div>
                </label>
                <p className={`${message == "Usuário cadastrado com sucesso!" ? 'message-success' : 'message-error'}`}>{message}</p>
                <button className='btn-register' type="submit">Alterar</button>
            </form >
        </div>
    )
}

export default Perfil