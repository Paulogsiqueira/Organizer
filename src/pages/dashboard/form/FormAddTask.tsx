import { useForm } from 'react-hook-form';

const FormAddTask = () => {
    const { register, handleSubmit, formState: { errors },setValue } = useForm()
    const onSubmit = () => {
        console.log("ADD")
    }

    return (
    <div>
        <h3>Adicionar Nova Tarefa</h3>
        <form className='address-form' onSubmit={handleSubmit(onSubmit)}>
                <label className='address-label'>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Logradouro</p>
                            <input type="text" placeholder='Digite o logradouro' {...register("street", { required: true})} readOnly />
                        </div>
                        <div className='details-error'>
                            {errors?.street?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Número</p>
                            <input type="text" placeholder='Digite o Número' {...register("number", { required: true, pattern: /^[0-9]+$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.number?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.number?.type == 'pattern' && <p >Número inválido</p>}
                        </div>
                    </div>
                </label>
                <label className='address-label'>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Bairro</p>
                            <input type="text" placeholder='Digite o nome do bairro' {...register("district", { required: true})} readOnly />
                        </div>
                        <div className='details-error'>
                            {errors?.district?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Complemento</p>
                            <input type="text" placeholder='Digite o nome do complemento' />
                        </div>
                    </div>
                </label>
                <label className='address-label'>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Cidade</p>
                            <input type="text" placeholder='Digite o nome da cidade' {...register("city", { required: true})} readOnly />
                        </div>
                        <div className='details-error'>
                            {errors?.city?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Estado</p>
                            <input type="text" placeholder='Digite o nome do estado' {...register("state", { required: true})} readOnly />
                        </div>
                        <div className='details-error'>
                            {errors?.state?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                </label>
                <button className='btn-cep' type="submit">Confirmar dados</button>
            </form >
    </div>
  )
}

export default FormAddTask