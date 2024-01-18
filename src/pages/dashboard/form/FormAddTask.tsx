import { useForm, SubmitHandler, UseFormReturn, Controller } from 'react-hook-form';
import '@/style/dashboard/form/formAddTask.sass'

interface FormData {
    activity: string;
    estimatedTime: string;
    criticaly: string;
    column: string;
  }

const FormAddTask = () => {
    const { register, handleSubmit, formState: { errors }, control } : UseFormReturn<FormData> = useForm<FormData>()
    
    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data.activity);
      };

    return (
        <div className='dashboard-form'>
            <h3>Nova Tarefa</h3>
            <form className='dashboard-form__body' onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <div className='form-input__long'>
                        <div className='input-button'>
                            <p>Atividade</p>
                            <input type="text" placeholder='Digite o nome da atividade' {...register("activity", { required: true })} />
                        </div>
                        <div className='details-error'>
                            {errors?.activity?.type == 'required' && <p >Campo obrigatório</p>}
                        </div>
                    </div>
                    <div className='form-input__short'>
                        <div className='input-button'>
                            <p className='input-title__time'>Tempo estimado</p>
                            <input type="text" placeholder='00:00' {...register("estimatedTime", { required: true, pattern: /^[0-9]+$/ })} />
                        </div>
                        <div className='details-error'>
                            {errors?.estimatedTime?.type == 'required' && <p >Campo obrigatório</p>}
                            {errors?.estimatedTime?.type == 'pattern' && <p >Número inválido</p>}
                        </div>
                    </div>
                </label>
                <label>
                    <div className='form-input__short'>
                        <div className='input-button'>
                            <p>Criticidade:</p>
                            <Controller
                                name="criticaly"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select {...field}>
                                        <option value='1'>Baixa</option>
                                        <option value='2'>Média</option>
                                        <option value='3'>Alta</option>
                                    </select>
                                )}
                            />
                        </div>
                    </div>
                    <div className='form-input__short'>
                        <div className='input-button'>
                            <p>Coluna:</p>
                            <Controller
                                name="column"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select {...field}>
                                        <option value='1'>To Do</option>
                                        <option value='2'>Doing</option>
                                        <option value='3'>Done</option>
                                    </select>
                                )}
                            />
                        </div>
                    </div>
                    <div className='form-input__short'>
                        <div className='input-button'>
                            <p className='input-title__date'>Data Limite</p>
                            <input type="date" placeholder='Digite o nome do complemento' />
                        </div>
                    </div>
                </label>

                <div className='dashboard-form__button'>
                    <button type="submit">Adicionar Tarefa</button>
                </div>
            </form >
        </div>
    )
}

export default FormAddTask