import { completedTasks } from '@/interfaces/task'
import TaskGraph from './Graph/TaskGraph'
import HourGraph from './Graph/HourGraph'
import TypeGraph from './Graph/TypeGraph'
import EstimatedTimeGraph from './Graph/EstimatedTimeGraph'
import '@/style/statistics/GraphBoard.sass';
import { useEffect, useState } from 'react'
import { selectUser } from '@/redux/sliceUser';
import { useSelector } from 'react-redux';
import { getCompletedTasks } from '@/methods/dashboard/dashboardMethods'
import FilterDateForm from './Form/FilterDateForm'
import TaskFromOtherUsers from '../dashboard/taskFromOthersUsers/TaskFromOthersUsers'


const GraphBoard = () => {
    const user = useSelector(selectUser);
    const [hoursWorked, sethoursWorked] = useState(0);
    const [completedTasksList, setCompletedTasksList] = useState<completedTasks[]>([]);
    const [idUser, setIdUser] = useState(user.idUser)


    const loadCompletedTasks = async (id: string) => {
        const completedTasksList = await getCompletedTasks(id)
        setCompletedTasksList(completedTasksList);
    }

    const changeIdUser = (id: string) =>{
        setIdUser(id)
    }

    const calcHoursWorked = () => {
        let SumMoursWorked = 0
        completedTasksList.forEach((task: completedTasks) => {
            const [workedHours, workedMinutes] = task.timeWorked.split(' : ').map(Number);
            const hoursWorked = parseFloat((workedHours + (workedMinutes / 60)).toFixed(2));
            SumMoursWorked += hoursWorked
        }
        )
        sethoursWorked(SumMoursWorked)
    }

    const submitFilter = async (firstDate: string, secondDate: string) => {
        const searchedTasks: completedTasks[] = [];
        const allCompletedTasks = await getCompletedTasks(user.idUser)
        allCompletedTasks.forEach((task: completedTasks) => {
            const taskDeliveryDate = new Date(task.deliveryDate)
            const filterStartDate = new Date(firstDate)
            const filterEndDate = new Date(secondDate)
            if (taskDeliveryDate >= filterStartDate && taskDeliveryDate <= filterEndDate) {
                searchedTasks.push(task)
            }
        })
        setCompletedTasksList(searchedTasks)
    }

    useEffect(() => {
        loadCompletedTasks(idUser);
    }, [idUser]);

    useEffect(() => {
        calcHoursWorked()
    }, [completedTasksList]);


    return (
        <div>
            <TaskFromOtherUsers changeIdUser={changeIdUser}/>
            <div className="graphboard">
                <h3>Dados e Gráficos</h3>
                <FilterDateForm submitFilter={submitFilter} />
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
        </div>
    )
}

export default GraphBoard