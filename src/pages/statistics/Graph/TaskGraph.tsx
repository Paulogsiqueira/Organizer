import ReactApexChart from "react-apexcharts";
import { getCompletedTasks } from "@/methods/dashboard/dashboardMethods";
import { selectUser } from '@/redux/sliceUser';
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";

const TaskGraph = () => {
    const user = useSelector(selectUser);
    const [completedTasks, setCompletedTasks] = useState({inTime: 0, outTime: 0, extraMinutes: 0, payedMinutes: 0});

    const loadCompletedTasks = async () => {
        console.log(user.idUser)
        getCompletedTasks(user.idUser);

    }

    useEffect(() => {
        loadCompletedTasks();
      }, []);

    const state = {
        series: [completedTasks.inTime, completedTasks.outTime],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Entregues no prazo', 'Entregues atrasada'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        } as ApexCharts.ApexOptions
    };

    return (
        <div>
            <h3 className="graph-title">Tarefas Entregues</h3>
            <ReactApexChart options={state.options} series={state.series} type="pie" />
            <h4 className="graph-title">Total de tarefas : {completedTasks.inTime + completedTasks.outTime}</h4>
        </div>
    );
}

export default TaskGraph;
