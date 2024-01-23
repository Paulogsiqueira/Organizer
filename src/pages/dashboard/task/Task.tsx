import { Draggable } from '@hello-pangea/dnd';
import '@/style/dashboard/task/task.sass'
import deleteButton from '/dashboard/delete.png';
import editButton from '/dashboard/edit.png';
import { getTask, tasksUserReorder } from '@/methods/dashboard/dashboardMethods';
import { TaskInterface } from '@/interfaces/task';
import { selectUser } from '@/redux/sliceUser'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import EditCardModal from '../modal/EditCardModal';


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
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false)
  const parts = task.deadline.split('-');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const formatedCriticaly = task.criticaly == '1' ? 'Baixa' : task.criticaly == '2' ? 'Média' : 'Alta'

  const openModalError = () => {
    setModalErrorIsOpen(true)
  }

  const closeModal = () => {
    setModalErrorIsOpen(false)
  }

  async function deleteCard(id: string, column: string) {
    let option: "1" | "2" | "3" = column === 'done' ? '3' : column === 'doing' ? '2' : '1';
    const list = await getTask(user.idUser, column)
    const arrayList = JSON.parse(list)
    const newList = arrayList.filter((item: TaskInterface) => item.id !== id);
    const listToString = JSON.stringify(newList)
    tasksUserReorder(user.idUser, listToString, option)
    reloadTask()
  }

  return (
    <div>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div className='dashboard-item'
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className='task-button'>
              <div className='edit-button'>
                <img src={editButton} alt="edit button" onClick={() => (openModalError())} />
              </div>
              <div className='delete-button' onClick={() => (deleteCard(task.id, column))}>
                <img src={deleteButton} alt="delete button" />
              </div>
            </div>
            <p className='card-title'>{task.name}</p>
            <div className='card-fields'>
              <p className='dashboard-subtitle'>Data limite: {formattedDate}</p>
              {formatedCriticaly === "Baixa" && <p className='dashboard-subtitle'><p className="lowCrit"> Criticidade: {formatedCriticaly}</p></p>}
              {formatedCriticaly === "Média" && <p className='dashboard-subtitle'><p className="mediumCrit">Criticidade: {formatedCriticaly}</p></p>}
              {formatedCriticaly === "Alta" && <p className='dashboard-subtitle'><p className="highCrit">Criticidade: {formatedCriticaly}</p></p>}
            </div>
            <div className='card-fields'>
              <p className='dashboard-subtitle'>Tempo estimado: {task.estimatedTime.replace(/\s/g, "")} hrs</p>
              <p className='dashboard-subtitle'>Tempo trabalhado: {task.timeWorked} hrs</p>
            </div>
          </div>
        )}
      </Draggable>
      <EditCardModal closeModal={closeModal} modalErrorIsOpen={modalErrorIsOpen} task={task} column={column} reloadTask={reloadTask} />
    </div>
  );
}

export default Task