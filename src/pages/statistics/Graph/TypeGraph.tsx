import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { completedTasks } from "@/interfaces/task";

const TaskGraph = ({ completedTasksList }: { completedTasksList: completedTasks[] }) => {

    const [deliveryTasks, setDeliveryTasks] = useState({ work: 0, rework: 0, support: 0, meeting: 0 });

    const typesOfTasksDelivered = async () => {
        completedTasksList.forEach(task => {
            if (task.type == 1) {
                setDeliveryTasks(prevState => ({
                    ...prevState,
                    work: prevState.work + 1
                }));
            } else if (task.type == 2) {
                setDeliveryTasks(prevState => ({
                    ...prevState,
                    rework: prevState.rework + 1
                }));
            } else if (task.type == 3) {
                setDeliveryTasks(prevState => ({
                    ...prevState,
                    support: prevState.support + 1
                }));
            } else {
                setDeliveryTasks(prevState => ({
                    ...prevState,
                    meeting: prevState.meeting + 1
                }));
            }
        })
    }

    useEffect(() => {
        typesOfTasksDelivered();
    }, [completedTasksList]);

    const state = {
        series: [deliveryTasks.work, deliveryTasks.rework, deliveryTasks.support, deliveryTasks.meeting],
        options: {
            labels: ['Trabalho', 'Retrabalho', 'Suporte', 'Reunião'],
            legend:{
                position: 'right',
                fontSize: '14px',
                fontWeight: 'bold',
                labels:{
                    colors: '#5ABFA6'
                }
                
            }

        } as ApexCharts.ApexOptions
    };

    return (
        <div className="graph-content">
            <h3 className="graph-title">Tipo de Tarefas Entregues</h3>
            <ReactApexChart options={state.options} series={state.series} type='pie' />
        </div>
    );
}

export default TaskGraph;
