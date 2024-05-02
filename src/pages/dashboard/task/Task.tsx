import { changeTaskStatus } from '@/methods/dashboard/dashboardMethods';
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
import clock from '/dashboard/clock.png';
import '@/style/dashboard/task/task.sass'
import AddTimeModal from '../modal/AddTimeModal';

const Task = ({ task, column, reloadTask }: TaskProps) => {
  const [showTask, setShowTask] = useState(true)
  const [modalAddTimeIsOpen, setModalAddTimeIsOpen] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [finishModalIsOpen, setFinishModalIsOpen] = useState(false)
  const parts = task.deadline.split('-');
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  const formatedCriticaly = task.criticaly == '1' ? 'Baixa' : task.criticaly == '2' ? 'Média' : 'Alta'
  const formatedType = task.type == '1' ? 'Trabalho' : task.type == '2' ? 'Retrabalho' : task.type == '3' ? 'Suporte' : 'Reunião'
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
    } else if(type == "add"){
      setModalAddTimeIsOpen(!modalAddTimeIsOpen)
    }else {
      setFinishModalIsOpen(!finishModalIsOpen)
    }
  }

  const changeCardStatus = (taskId: number, situation: number) => {
    changeTaskStatus(taskId,situation)
    setTimeout(() => {
      reloadTask()
    }, 0);
  }

  const finishTask = () => {
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
              <div className='time-button'>
                <img src={clock} alt="add worked time" onClick={() => (changeModal("add"))} />
              </div>
              <div className='show-button'>
                <img src={showTask ? show : hide} alt="show" onClick={() => (setShowTask(!showTask))} />
              </div>
              <div className='edit-button'>
                <img src={editButton} alt="edit button" onClick={() => (changeModal("edit"))} />
              </div>
              <div style={{ display: column == "done" ? 'inline' : 'none' }} className='finish-button' onClick={() => (finishTask())}>
                <img src={finish} alt="finish card" />
              </div >
              <div className='delete-button' onClick={() => (changeCardStatus(parseInt(task.task_id), 2))}>
                <img src={deleteButton} alt="delete button" />
              </div>
            </div>
            <p className='card-title'>{task.title}</p>
            <div style={{ display: showTask ? 'inline' : 'none' }}>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>{windowWidth > 1420 ? 'Data Limite' : 'D. Limite'}: {formattedDate}</p>
              </div>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>Tipo: {formatedType}</p>
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
      <AddTimeModal changeModal={changeModal} modalAddTimeIsOpen={modalAddTimeIsOpen} task={task} reloadTask={reloadTask} />
      <FinishCardModal taskId={task.task_id} changeModal={changeModal} finishModalIsOpen={finishModalIsOpen} changeCardStatus={changeCardStatus} />
    </div>
  );
}

export default Task