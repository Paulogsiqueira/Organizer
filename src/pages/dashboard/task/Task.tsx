import { compareAndSetDeadlineHours, compareAndSetDeadlineDate, deleteTask } from '@/methods/dashboard/dashboardMethods';
import { updateCompletedTasks } from '@/methods/dashboard/dashboardMethods';
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import { TaskProps } from '@/interfaces/task';
import { Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import FinishCardModal from '../modal/FinishCardModal';
import EditCardModal from '../modal/EditCardModal';
import deleteButton from '/dashboard/delete.png';
import editButton from '/dashboard/edit.png';
import finish from '/dashboard/finish.png';
import show from '/dashboard/show.png';
import hide from '/dashboard/hide.png';
import '@/style/dashboard/task/task.sass'

const Task = ({ task, column, reloadTask }: TaskProps) => {
  const user = useSelector(selectUser)
  const [showTask, setShowTask] = useState(true)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [finishModalIsOpen, setFinishModalIsOpen] = useState(false)
  const [deadlineDate, setDeadlineDate] = useState('')
  const [deadlineHours, setDeadlineHours] = useState('')
  const parts = task.deadline.split('-');
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  const formatedCriticaly = task.criticaly == '1' ? 'Baixa' : task.criticaly == '2' ? 'Média' : 'Alta'
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const changeModal = (type: string) => {
    if (type == "edit") {
      setModalEditIsOpen(!modalEditIsOpen)
    } else {
      setFinishModalIsOpen(!finishModalIsOpen)
    }
  }


  const deleteCard = (taskId: number) => {
    deleteTask(taskId)
  }

  const finishTask = () => {
    compareAndSetDeadlineDate(task.deadline, setDeadlineDate)
    compareAndSetDeadlineHours(task.estimated_time, task.time_worked, setDeadlineHours)
    updateCompletedTasks(user.idUser, task.deadline, task.time_worked, task.estimated_time)
    changeModal("finish")
  }

  return (
    <div>
      <Draggable draggableId={(task.task_id).toString()} index={parseInt(task.position)} key={task.task_id}>
        {(provided) => (
          <div className='dashboard-item'
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className='task-button'>
              <div className='show-button'>
                <img src={showTask ? show : hide} alt="show" onClick={() => (setShowTask(!showTask))} />
              </div>
              <div className='edit-button'>
                <img src={editButton} alt="edit button" onClick={() => (changeModal("edit"))} />
              </div>
              <div style={{ display: column == "done" ? 'inline' : 'none' }} className='finish-button' onClick={() => (finishTask())}>
                <img src={finish} alt="finish card" />
              </div >
              <div className='delete-button' onClick={() => (deleteCard(parseInt(task.task_id)))}>
                <img src={deleteButton} alt="delete button" />
              </div>
            </div>
            <p className='card-title'>{task.title}</p>
            <div style={{ display: showTask ? 'inline' : 'none' }}>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>{windowWidth > 1420 ? 'Data Limite' : 'D. Limite'}: {formattedDate}</p>
                <p className='dashboard-subtitle'><span className={formatedCriticaly === "Baixa" ? "lowCrit" : formatedCriticaly === "Média" ? "mediumCrit" : "highCrit"}>{windowWidth > 1420 ? 'Criticidade' : 'Critic.'}: {formatedCriticaly}</span></p>
              </div>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>{windowWidth > 1420 ? 'Tempo Estimado' : 'T. Estimad.'}: {task.estimated_time.replace(/\s/g, "")} hrs</p>
                <p className='dashboard-subtitle'>{windowWidth > 1420 ? 'Tempo Trabalhado' : 'T. Trabalh.'}: {task.time_worked != "" ? task.time_worked : "00:00"} hrs</p>
              </div>
            </div>

          </div>
        )}
      </Draggable>
      <EditCardModal changeModal={changeModal} modalEditIsOpen={modalEditIsOpen} task={task} column={column} reloadTask={reloadTask} />
      <FinishCardModal taskId={task.task_id} changeModal={changeModal} finishModalIsOpen={finishModalIsOpen} deadlineDate={deadlineDate} deadlineHours={deadlineHours} deleteCard={deleteCard} />
    </div>
  );
}

export default Task