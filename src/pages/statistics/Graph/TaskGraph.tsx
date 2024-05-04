import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";
import { completedTasks } from "@/interfaces/task";

const TaskGraph = ({ completedTasksList }: { completedTasksList: completedTasks[] }) => {

    const [deliveryTasks ,setDeliveryTasks] = useState({inTime: 0, outTime: 0});

    const withinOrOutsideTheDeadline = async () => {
        setDeliveryTasks({inTime: 0, outTime: 0})
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
            responsive: [{
                breakpoint: 900,
                options: {
                    legend:{
                        position: 'bottom',
                        width: 300
                    }
                },
                
            }],
            legend:{
                position: 'right',
                fontSize: '14px',
                fontWeight: 'bold',
                width: 150,
                labels:{
                    colors: '#5ABFA6'
                }
                
            }
        } as ApexCharts.ApexOptions
    };

    return (
        <div className="graph-content">
            <p className="graph-title">Prazo de Tarefas Entregues</p>
            <ReactApexChart options={state.options} series={state.series} type='pie' />
        </div>
    );
}

export default TaskGraph;
