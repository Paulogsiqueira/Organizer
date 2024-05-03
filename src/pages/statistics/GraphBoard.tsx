import { completedTasks } from '@/interfaces/task'
import TaskGraph from './Graph/TaskGraph'
import HourGraph from './Graph/HourGraph'
import TypeGraph from './Graph/TypeGraph'
import EstimatedTimeGraph from './Graph/EstimatedTimeGraph'
import '@/style/statistics/GraphBoard.sass'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { selectUser } from '@/redux/sliceUser';
import { useSelector } from 'react-redux';
import { getCompletedTasks } from '@/methods/dashboard/dashboardMethods'

const GraphBoard = () => {
    const user = useSelector(selectUser);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const [hoursWorked, sethoursWorked] = useState(0);
    const [completedTasksList, setCompletedTasksList] = useState<completedTasks[]>([]);


    const loadCompletedTasks = async (id: string) => {
        const completedTasksList = await getCompletedTasks(id)
        setCompletedTasksList(completedTasksList);
        completedTasksList.forEach((task: completedTasks) => {
            const [workedHours, workedMinutes] = task.timeWorked.split(' : ').map(Number);
            const hoursWorked = parseFloat((workedHours + (workedMinutes / 60)).toFixed(2));
            sethoursWorked(prevExtraHours => prevExtraHours + hoursWorked);
        }
        )
    }

    const handleFilter = async () => {
        console.log(getValues('firstDate'))
        console.log(getValues('secondDate'))
    }

    useEffect(() => {
        loadCompletedTasks(user.idUser);
    }, []);


    return (
        <div className="graphboard">
            <h3>Dados e Gráficos</h3>
            <div>
                <form className='graphboard-form' onSubmit={handleSubmit(handleFilter)}>
                    <label className='graphboard-label'>
                        <div className='graphboard-input'>
                            <div className='graphboard-field'>
                                <p>Filtrar tarefas entregues de </p>
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
            <div className="graphboard-info">
                <ul>
                    <li><p> Tarefas Entregues: {completedTasksList.length}</p></li>
                    <li><p> Horas Trabalhadas: {hoursWorked.toFixed(2)}</p></li>
                </ul>
            </div>
            <div className="statistics-graph">
                <div className="taskGraph">
                    <TaskGraph completedTasksList={completedTasksList} />
                </div>
                <div className="taskGraph">
                    <TypeGraph completedTasksList={completedTasksList} />
                </div>
                <div className="taskGraph">
                    <HourGraph completedTasksList={completedTasksList} />
                </div>
                <div className="taskGraph">
                    <EstimatedTimeGraph completedTasksList={completedTasksList} />
                </div>
            </div>

        </div>
    )
}

export default GraphBoard