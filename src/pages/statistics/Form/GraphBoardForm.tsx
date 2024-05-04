import { GraphBoardFormProps } from '@/interfaces/task';
import { useForm } from 'react-hook-form';
import '@/style/statistics/form/GraphBoardForm.sass';

const GraphBoardForm: React.FC<GraphBoardFormProps> = ({ submitFilter }) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()

    const handleFilter = async () => {
        submitFilter(getValues("firstDate"), getValues("secondDate"))
    }

  return (
    <div>
    <form className='graphboard-form' onSubmit={handleSubmit(handleFilter)}>
        <label className='graphboard-label'>
            <div className='graphboard-input'>
                <div className='graphboard-field'>
                    <p>Tarefas entregues de </p>
                    <input type="date" {...register("firstDate", { required: true })} />
                </div>
                <div className='graphboard-error'>
                    {errors?.firstDate?.type == 'required' && <p className='first-input' >Campo obrigatório</p>}
                </div>
            </div>
        </label>
        <label className='graphboard-label'>
            <div className='graphboard-input'>
                <div className='graphboard-field'>
                    <p>até</p>
                    <input type="date" {...register("secondDate", { required: true })} />
                </div>
                <div className='graphboard-error'>
                    {errors?.secondDate?.type == 'required' && <p className='second-input' >Campo obrigatório</p>}
                </div>
            </div>
        </label>
        <button className='btn-filter' type="submit">Filtrar</button>
    </form >
</div>
  )
}

export default GraphBoardForm