import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import '@/style/statistics/graph/TaskGraph.sass';
import '@/style/statistics/Statistics.sass';
import { completedTasks } from "@/interfaces/task";

const HourGraph = ({ completedTasksList }: { completedTasksList: completedTasks[] }) => {
    const [payedHours, setPayedHours] = useState(0);
    const [extraHours, setExtraHours] = useState(0);

    const loadCompletedTasks = async () => {
        completedTasksList.forEach(task => {
            const [horas, minutos] = task.extraTime.split(':').map(Number);
            const totalMinutos = horas * 60 + minutos;
            if (totalMinutos > 0) {
                setExtraHours(prevPayedHours => prevPayedHours + 1)
            } else {
                setPayedHours(prevPayedHours => prevPayedHours + 1)
            }
        }
        )
    }

    useEffect(() => {
        loadCompletedTasks();
    }, [completedTasksList]);

    const state: {
        series: number[];
        options: ApexCharts.ApexOptions;
    } = {
        series: [payedHours, extraHours],
        options: {
            labels: ['Tarefa não excedeu a estimativa', 'Tarefa excedeu a estimativa'],
            legend:{
                position: 'right',
                fontSize: '14px',
                fontWeight: 'bold',
                width: 180,
                labels:{
                    colors: '#5ABFA6'
                }
                
            }
        },
        
    };

    return (
        <div className="graph-content">
            <h3 className="graph-title">Tarefas que Excederam a Estimativa de Horas</h3>
            <ReactApexChart class="grafico" options={state.options} series={state.series} type='pie'  />
        </div>
    );
};

export default HourGraph;
