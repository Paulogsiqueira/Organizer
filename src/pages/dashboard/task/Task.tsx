import { compareAndSetDeadlineHours, compareAndSetDeadlineDate } from '@/methods/dashboard/dashboardMethods';
import { getTask, tasksUserReorder, updateCompletedTasks } from '@/methods/dashboard/dashboardMethods';
import { TaskInterface } from '@/interfaces/task';
import { useSelector } from 'react-redux'
import { selectUser } from '@/redux/sliceUser'
import { TaskProps } from '@/interfaces/task';
import { Draggable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react';
import FinishCardModal from '../modal/FinishCardModal';
import EditCardModal from '../modal/EditCardModal';
import deleteButton from '/dashboard/delete.png';
import editButton from '/dashboard/edit.png';
import finish from '/dashboard/finish.png';
import show from '/dashboard/show.png';
import hide from '/dashboard/hide.png';
import '@/style/dashboard/task/task.sass'

const Task = ({ task, index, column, reloadTask }: TaskProps) => {
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

  const openModal = async (type: string) => {
    if (type == "edit") {
      setModalEditIsOpen(true)
    } else {
      setFinishModalIsOpen(true)
    }
  }

  const closeModal = (type: string) => {
    if (type == "edit") {
      setModalEditIsOpen(false)
    } else {
      setFinishModalIsOpen(false)
    }
  }

  async function deleteCard(id: string, column: string) {
    let option: "1" | "2" | "3" = column === 'done' ? '3' : column === 'doing' ? '2' : '1';
    const list = await getTask(user.idUser, column)
    const arrayList = JSON.parse(list)
    const newList = arrayList.filter((item: TaskInterface) => item.id !== id);
    const listToString = JSON.stringify(newList)
    await tasksUserReorder(user.idUser, listToString, option)
    reloadTask()
  }

  function finishTask() {
    compareAndSetDeadlineDate(task.deadline, setDeadlineDate)
    compareAndSetDeadlineHours(task.estimatedTime, task.timeWorked, setDeadlineHours)
    updateCompletedTasks(user.idUser, task.deadline, task.timeWorked, task.estimatedTime)
    openModal("finish")
  }

  return (
    <div>
      <Draggable draggableId={task.id} index={index} key={task.id}>
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
                <img src={editButton} alt="edit button" onClick={() => (openModal("edit"))} />
              </div>
              <div style={{ display: column == "done" ? 'inline' : 'none' }} className='finish-button' onClick={() => (finishTask())}>
                <img src={finish} alt="finish card" />
              </div >
              <div className='delete-button' onClick={() => (deleteCard(task.id, column))}>
                <img src={deleteButton} alt="delete button" />
              </div>
            </div>
            <p className='card-title'>{task.name}</p>
            <div style={{ display: showTask ? 'inline' : 'none' }}>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>{windowWidth > 1420 ? 'Data Limite' : 'D. Limite'}: {formattedDate}</p>
                <p className='dashboard-subtitle'><span className={formatedCriticaly === "Baixa" ? "lowCrit" : formatedCriticaly === "Média" ? "mediumCrit" : "highCrit"}>{windowWidth > 1420 ? 'Criticidade' : 'Critic.'}: {formatedCriticaly}</span></p>
              </div>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>{windowWidth > 1420 ? 'Tempo Estimado' : 'T. Estimad.'}: {task.estimatedTime.replace(/\s/g, "")} hrs</p>
                <p className='dashboard-subtitle'>{windowWidth > 1420 ? 'Tempo Trabalhado' : 'T. Trabalh.'}: {task.timeWorked != "" ? task.timeWorked : "00:00"} hrs</p>
              </div>
            </div>

          </div>
        )}
      </Draggable>
      <EditCardModal closeModal={closeModal} modalEditIsOpen={modalEditIsOpen} task={task} column={column} reloadTask={reloadTask} />
      <FinishCardModal closeModal={closeModal} finishModalIsOpen={finishModalIsOpen} deadlineDate={deadlineDate} deadlineHours={deadlineHours} />
    </div>
  );
}

export default Task