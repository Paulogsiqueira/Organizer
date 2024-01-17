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


interface TaskProps {
  task: {
    id: string;
    name: string;
  },
  index: number,
  column: string,
  reloadTask: () => void
}


const Task = ({ task, index, column, reloadTask }: TaskProps) => {
  const user = useSelector(selectUser)
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false)

  const openModalError = () => {
    setModalErrorIsOpen(true)
  }

  const closeModal = () => {
    setModalErrorIsOpen(false)
  }

  async function deleteCard(id: string, column: string) {
    let option = column === 'done' ? '3' : column === 'doing' ? '2' : '1';
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
            <p>{task.name}</p>
          </div>
        )}
      </Draggable>
      <EditCardModal closeModal={closeModal} modalErrorIsOpen={modalErrorIsOpen} />
    </div>
  );
}

export default Task