import { useForm } from 'react-hook-form';
import '@/style/register/Register.sass'

const Register = () => {
    const { register, handleSubmit, formState: { errors }} = useForm()

    const registerUser = () => {
        console.log("Cadastro")
    }

    return (
        <div className='register-page'>
            <div className='register-text'>
                <h2>Crie sua conta</h2>
                <p>Começe agora a organizar suas tarefas e gerenciar melhor o seu tempo!</p>
            </div>
            <form className='register-form' onSubmit={handleSubmit(registerUser)}>
                <label className='register-label'>
                    <div className='register-input'>
                        <div className='details-input'>
                            <p>Nome</p>
                            <input type="text" placeholder='Digite seu nome' {...register("name", { required: true })} />
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
                            <input type="text" placeholder='Digite seu email' {...register("email", { required: true, pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ })} />
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
                            <p>Senha</p>
                            <input type="text" placeholder='Digite sua senha' {...register("password", { required: true, pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/})} />
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
                            <p>Confirmar Senha</p>
                            <input type="text" placeholder='Digite sua senha novamente' {...register("confirmPassword", { required: true, pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })}/>
                        </div>
                        <div className='details-error'>
                            {errors?.confirmPassword?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.confirmPassword?.type == 'pattern' && <p >A senha deve conter letras e números e pelo menos 6 caracteres</p>}
                        </div>
                    </div>
                </label>
                <button className='btn-cep' type="submit">Cadastrar</button>
            </form >
        </div>
    )
}

export default Register