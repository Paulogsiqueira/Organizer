import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { completedTasks } from "@/interfaces/task";

const TaskGraph = ({ completedTasksList }: { completedTasksList: completedTasks[] }) => {

    const [deliveryTasks ,setDeliveryTasks] = useState({inTime: 0, outTime: 0});

    const withinOrOutsideTheDeadline = async () => {
       completedTasksList.forEach(task => {
        if(task.deliveryStatus == "out-of-time"){
            setDeliveryTasks(prevState => ({
                ...prevState,
                outTime: prevState.outTime + 1
              }));
        }else{
            setDeliveryTasks(prevState => ({
                ...prevState,
                inTime: prevState.inTime + 1
              }));
        }
       })
    }

    useEffect(() => {
        withinOrOutsideTheDeadline();
      }, [completedTasksList]);

    const state = {
        series: [deliveryTasks.inTime, deliveryTasks.outTime],
        options: {
            labels: ['No prazo', 'Atrasada'],
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
            <h3 className="graph-title">Prazo de Tarefas Entregues</h3>
            <ReactApexChart options={state.options} series={state.series} type='pie' />
        </div>
    );
}

export default TaskGraph;
