import { selectUser } from '@/redux/sliceUser';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { completedTasks } from "@/interfaces/task";
import '@/style/statistics/Statistics.sass'
import { getCompletedTasks } from "@/methods/dashboard/dashboardMethods";
import GraphBoard from "./GraphBoard";


const Statistics = () => {
    const user = useSelector(selectUser);
    const [completedTasksList, setCompletedTasksList] = useState<completedTasks[]>([]);


    const getCompletedtasksList = async (id: string) => {
        const completedTasksList = await getCompletedTasks(id)
        setCompletedTasksList(completedTasksList);
    }

    useEffect(() => {
        getCompletedtasksList(user.idUser);
    }, []);

    return (
        <div className="statistics">
            <h2>Estatísticas</h2>
            <div className="statistics-text">
                <p>O acompanhamento de estatísticas desempenha um papel crucial na gestão eficiente da produtividade de uma equipe. Ao coletar e analisar dados quantitativos relacionados ao desempenho, é possível identificar padrões, avaliar metas e tomar decisões informadas. As estatísticas proporcionam uma visão objetiva das atividades realizadas, permitindo que líderes e gestores compreendam o fluxo de trabalho, identifiquem pontos de otimização e promovam a eficiência operacional.</p>
            </div>
            <GraphBoard completedTasksList={completedTasksList} />
        </div>
    )
}

export default Statistics