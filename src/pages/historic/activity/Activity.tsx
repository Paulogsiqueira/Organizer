import { activityRegister } from '@/interfaces/task'
import '@/style/historic/activity/activity.sass'


const Activity = ({ activity }: { activity: activityRegister }) => {
    return (
        <div className='activity'>
            <div className='activity-date'>
                <p className='activity-section__title'>Data da Atividade</p>
                <p className='activity-section__text'>{activity.activityDate}</p>
            </div>
            <div className='activity-title'>
                <p className='activity-section__title'>Titulo da Atividade</p>
                <p className='activity-section__text'>{activity.title}</p>
            </div>
            <div className='activity-hoursAdded'>
                <p className='activity-section__title'>Horas Adicionadas</p>
                <p className='activity-section__text'>{activity.hoursAdded}</p>
            </div>
            <div className='activity-finalHours'>
                <p className='activity-section__title'>Horas na Atividade</p>
                <p className='activity-section__text'>{activity.finalHours}</p>
            </div>
            <div className='activity-estimatedHours'>
                <p className='activity-section__title'>Horas Estimadas</p>
                <p className='activity-section__text'>{activity.estimatedTime}</p>
            </div>
        </div>
    )
}

export default Activity