import { completedTasks } from '@/interfaces/task'
import TaskGraph from './Graph/TaskGraph'
import HourGraph from './Graph/HourGraph'
import TypeGraph from './Graph/TypeGraph'
import EstimatedTimeGraph from './Graph/EstimatedTimeGraph'
import '@/style/statistics/GraphBoard.sass'
import { useEffect, useState } from 'react'

const GraphBoard = ({ completedTasksList }: { completedTasksList: completedTasks[] }) => {
    const [hoursWorked, sethoursWorked] = useState(0);


    const loadCompletedTasks = async () => {
        completedTasksList.forEach(task => {
            const [workedHours, workedMinutes] = task.timeWorked.split(' : ').map(Number);
            const hoursWorked = parseFloat((workedHours + (workedMinutes / 60)).toFixed(2));
            sethoursWorked(prevExtraHours => prevExtraHours + hoursWorked);
        }
        )
    }

    useEffect(() => {
        loadCompletedTasks();
    }, [completedTasksList]);
    return (
        <div className="graphboard">
            <h3>Dados e Gráficos</h3>
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