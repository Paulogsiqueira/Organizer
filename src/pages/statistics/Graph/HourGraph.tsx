import { getCompletedTasks } from "@/methods/dashboard/dashboardMethods";
import '@/style/statistics/graph/TaskGraph.sass'
import ReactApexChart from "react-apexcharts";
import '@/style/statistics/Statistics.sass'
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { useState, useEffect } from "react";


const HourGraph
    = () => {
        const user = useSelector(selectUser)
        const [payedHours, setPayedHours] = useState(1)
        const [extraHours, setExtraHours] = useState(1)

        const loadCompletedTasks = async () => {
            const stringCompletedTasks = await getCompletedTasks(user.idUser)
            const obCompletedTasks = JSON.parse(stringCompletedTasks)
            //setCompletedTasks(obCompletedTasks)
            const payedHours = parseFloat((obCompletedTasks.payedMinutes / 60).toFixed(2))
            const extraHours = parseFloat((obCompletedTasks.extraMinutes / 60).toFixed(2))
            setTimeout(() => {
                console.log(obCompletedTasks.extraMinutes)
                setPayedHours(payedHours > 0 ? payedHours : 2)
                setExtraHours(extraHours > 0 ? extraHours : 2)

            }, 0);

        }

        useEffect(() => {
            loadCompletedTasks()
        }, []);

        const state = {
            series: [payedHours, extraHours],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['Horas pagas', 'Horas extras'],
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
            },
        };
        return (
            <div>
                <h3 className="graph-title">Horas Trabalhadas</h3>
                <ReactApexChart options={state.options} series={state.series} type="pie" />
            </div>
        );
    }

export default HourGraph
    ;
