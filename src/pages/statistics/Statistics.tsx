import HourGraph from "./Graph/HourGraph";
import TaskGraph from "./Graph/TaskGraph";
import '@/style/statistics/Statistics.sass'


const Statistics = () => {
    return (
        <div className="statistics">
            <h2>Estatísticas</h2>
            <div className="statistics-text">
                <p>O acompanhamento de estatísticas desempenha um papel crucial na gestão eficiente da produtividade de uma equipe. Ao coletar e analisar dados quantitativos relacionados ao desempenho, é possível identificar padrões, avaliar metas e tomar decisões informadas. As estatísticas proporcionam uma visão objetiva das atividades realizadas, permitindo que líderes e gestores compreendam o fluxo de trabalho, identifiquem pontos de otimização e promovam a eficiência operacional.</p>
            </div>
            <div className="statistics-graph">
                <div className="taskGraph">
                    <TaskGraph />
                </div>
                <div className="taskGraph">
                    <HourGraph/>
                </div>
            </div>
        </div>
    )
}

export default Statistics