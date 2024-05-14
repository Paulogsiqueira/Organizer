import '@/style/historic/historic.sass'
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import TaskFromOtherUsers from "../dashboard/taskFromOthersUsers/TaskFromOthersUsers"
import { useState, useEffect } from 'react'
import FilterDateForm from '../statistics/Form/FilterDateForm'
import { getHoursAdded } from '@/methods/dashboard/dashboardMethods'
import Activity from './activity/Activity'
import { activityRegister } from '@/interfaces/task'

const Historic = () => {
  const user = useSelector(selectUser)
  const [idUser, setIdUser] = useState(user.idUser)
  const [hoursAdded, setHoursAdded] = useState<activityRegister[]>([]);

  const changeIdUser = (idUser: string) => {
    setIdUser(idUser);
  }
  const submitFilter = async (firstDate: string, secondDate: string) => {
    console.log(firstDate, secondDate)
  }
  const loadCompletedTasks = async (id: string) => {
    const hoursAddedList = await getHoursAdded(id)
    setHoursAdded(hoursAddedList);
    console.log(hoursAddedList)
  }

  useEffect(() => {
    loadCompletedTasks(idUser);
  }, [idUser]);


  return (
    <div className='historic'>
      <div className='historic-title'>
        <h2>Histórico de Atividades</h2>
        <p>Acompanhe os histórico de horas lançadas em um determinado período de tempo</p>
      </div>
      <TaskFromOtherUsers changeIdUser={changeIdUser} />
      <div className='historic-dashboard'>
        <FilterDateForm submitFilter={submitFilter} />
        {hoursAdded.map((act)=>{
          return <Activity key={act.activityId} activity={act}/>
        })}
      </div>
    </div>
  )
}

export default Historic