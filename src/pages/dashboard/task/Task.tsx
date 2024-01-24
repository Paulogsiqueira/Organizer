import { Draggable } from '@hello-pangea/dnd'
import '@/style/dashboard/task/task.sass'
import deleteButton from '/dashboard/delete.png';
import editButton from '/dashboard/edit.png';
import show from '/dashboard/show.png';
import hide from '/dashboard/hide.png';
import finish from '/dashboard/finish.png';
import { getTask, tasksUserReorder } from '@/methods/dashboard/dashboardMethods';
import { TaskInterface } from '@/interfaces/task';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import EditCardModal from '../modal/EditCardModal';
import FinishCardModal from '../modal/FinishCardModal';


// Adiciar botão de encerrar tarefa quando na coluna done, salvar se tempo trabalhado > tempo estimado, salvar se data da tarefa foi suficiente para encerrar. Depois fazer pagina com gráficos

interface TaskProps {
  task: {
    id: string;
    name: string;
    estimatedTime: string;
    criticaly: string;
    deadline: string;
    timeWorked: string

  },
  index: number,
  column: string,
  reloadTask: () => void
}


const Task = ({ task, index, column, reloadTask }: TaskProps) => {
  const user = useSelector(selectUser)
  const [showTask, setShowTask] = useState(true)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [finishModalIsOpen, setFinishModalIsOpen] = useState(false)
  const parts = task.deadline.split('-');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const formatedCriticaly = task.criticaly == '1' ? 'Baixa' : task.criticaly == '2' ? 'Média' : 'Alta'
  console.log(task.timeWorked)

  const openModal = (type:string) => {
    if(type == "edit"){
      setModalEditIsOpen(true)
    }else{
      setFinishModalIsOpen(true) 
    }
  }

  const closeModal = (type:string) => {
    if(type == "edit"){
      setModalEditIsOpen(false)
    }else{
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
              <div style={{ display: column == "done" ? 'inline' : 'none' }} className='finish-button' onClick={() => (deleteCard(task.id, column))}>
                <img src={finish} alt="finish card" />
              </div >
              <div className='delete-button' onClick={() => (deleteCard(task.id, column))}>
                <img src={deleteButton} alt="delete button" />
              </div>
            </div>
            <p className='card-title'>{task.name}</p>
            <div style={{ display: showTask ? 'inline' : 'none' }}>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>Data limite: {formattedDate}</p>
                {formatedCriticaly === "Baixa" && <p className='dashboard-subtitle'><p className="lowCrit"> Criticidade: {formatedCriticaly}</p></p>}
                {formatedCriticaly === "Média" && <p className='dashboard-subtitle'><p className="mediumCrit">Criticidade: {formatedCriticaly}</p></p>}
                {formatedCriticaly === "Alta" && <p className='dashboard-subtitle'><p className="highCrit">Criticidade: {formatedCriticaly}</p></p>}
              </div>
              <div className='card-fields'>
                <p className='dashboard-subtitle'>Tempo estimado: {task.estimatedTime.replace(/\s/g, "")} hrs</p>
                <p className='dashboard-subtitle'>Tempo trabalhado: {task.timeWorked != "" ? task.timeWorked : "00:00"} hrs</p>
              </div>
            </div>

          </div>
        )}
      </Draggable>
      <EditCardModal closeModal={closeModal} modalEditIsOpen={modalEditIsOpen} task={task} column={column} reloadTask={reloadTask} />
      <FinishCardModal closeModal={closeModal} finishModalIsOpen={finishModalIsOpen}/>
    </div>
  );
}

export default Task