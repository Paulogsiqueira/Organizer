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
            const [hours, minutes] = task.extraTime.split(' : ').map(Number);
            const extraHoursWorked = parseFloat((hours + (minutes / 60)).toFixed(2));

            const [workedHours, workedMinutes] = task.timeWorked.split(' : ').map(Number);
            const hoursWorked = parseFloat((workedHours + (workedMinutes / 60)).toFixed(2));
            setExtraHours(prevExtraHours => prevExtraHours + extraHoursWorked);
            if(task.type == 2){
                setExtraHours(prevPayedHours => prevPayedHours + hoursWorked - extraHoursWorked)
            }else{
                setPayedHours(prevPayedHours => prevPayedHours + hoursWorked - extraHoursWorked)
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
            labels: ['Horas pagas', 'Horas não pagas'],
            legend:{
                position: 'right',
                fontSize: '14px',
                fontWeight: 'bold',
                labels:{
                    colors: '#5ABFA6'
                }
                
            }
        }
    };

    return (
        <div className="graph-content">
            <h3 className="graph-title">Horas Trabalhadas</h3>
            <ReactApexChart options={state.options} series={state.series} type='pie' />
        </div>
    );
};

export default HourGraph;
