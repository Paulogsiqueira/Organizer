import { useForm } from 'react-hook-form';

const FormAddTask = () => {
    const { register, handleSubmit, formState: { errors },setValue } = useForm()
    const onSubmit = () => {
        console.log("ADD")
    }

    return (
    <div>
        <h3>Adicionar Nova Tarefa</h3>
        <form className='dashboard-page' onSubmit={handleSubmit(onSubmit)}>
                <label className='address-label'>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Atividade</p>
                            <input type="text" placeholder='Digite o nome da atividade' {...register("activity", { required: true})} />
                        </div>
                        <div className='details-error'>
                            {errors?.activity?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                    <div className='address-input'>
                        <div className='details-input'>
                            <p>Tempo estimado</p>
                            <input type="text" placeholder='Digite o Número' {...register("estimatedTime", { required: true, pattern: /^[0-9]+$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.estimatedTime?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.estimatedTime?.type == 'pattern' && <p >Número inválido</p>}
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
                
                <button className='btn-cep' type="submit">Adicionar</button>
            </form >
    </div>
  )
}

export default FormAddTask